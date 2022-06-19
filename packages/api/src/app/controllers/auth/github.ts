import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AuthProvider, findOrCreateUser } from '../../services/user';
import { GithubUser } from '../../services/user.types';
import { pushDiscordWebhook } from '../../helpers/pushDiscordWebhook';
import { authorizeAndEnd } from '../../helpers/authorizeAndEnd';
import { defaultRouteHandler } from '../../../interfaces';
import log from '../../helpers/logger';

const { GITHUB_APP_SECRET, GITHUB_APP_ID, FRONTEND_URL } = process.env;

//Dictionary for request state checks
const stateDict = {};
const env = process.env.NODE_ENV;
const isDev = env === 'development';
class GithubAuthController {
  //Route for Oauth login with github
  public oauthRedirect: defaultRouteHandler = async (req, res) => {
    const url = 'https://github.com/login/oauth/authorize';
    if (!GITHUB_APP_ID) {
      res.send('GitHub app id not specified');
    }
    const state = uuidv4();
    stateDict[state] = new Date().getMilliseconds() + 5 * 60 * 1000;
    const body = {
      state,
      client_id: GITHUB_APP_ID,
      scope: ['read:user', 'user:email'].join(','),
      redirect_uri: `${
        isDev ? 'http://localhost:4200' : FRONTEND_URL
      }/api/auth/signin/github/callback`,
    };
    const qs = new URLSearchParams(body);

    res.redirect(`${url}?${qs}`);
  };
  //Route for Oauth login callback
  //handle cancelation + token requesting
  public oauthCallback: defaultRouteHandler = async (req, res) => {
    const { error, code, state } = req.query;

    //If github user cancels auth
    if (error) {
      //redirect to app
      res.redirect(FRONTEND_URL);
    }

    //Check state parameter in case of cross-forgery attempt
    if (!stateDict[state as string]) {
      res.send('State diff, possible cross-forgery attempt');
    }
    //Delete unused memory
    delete stateDict[state as string];

    const body = {
      client_id: GITHUB_APP_ID,
      client_secret: GITHUB_APP_SECRET,
      code,
    };
    const opts = { headers: { accept: 'application/json' } };

    try {
      //https://docs.github.com/en/developers/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps

      const tokenBundle = await axios
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data);

      const githubUser = (await axios
        .get('https://api.github.com/user', {
          headers: { Authorization: `token ${tokenBundle.access_token}` },
        })
        .then((_res) => _res.data)) as GithubUser;

      if (!githubUser.email) {
        const githubUserEmail = (await axios
          .get('https://api.github.com/user/emails', {
            headers: { Authorization: `token ${tokenBundle.access_token}` },
          })
          .then((_res) => _res.data[0].email)) as string;
        githubUser.email = githubUserEmail;
      }

      const gUser = {
        name: githubUser.login,
        email: githubUser.email || githubUser.login,
      };

      log.info(tokenBundle);
      log.info(gUser);

      const user = await findOrCreateUser(gUser, AuthProvider.GitHub);

      const discordWebhookBody = {
        title: `Github new user: ${user.name}`,
        description: `user authorization accepted`,
      };
      await pushDiscordWebhook(discordWebhookBody);
      return authorizeAndEnd(user, req, res, AuthProvider.GitHub);
    } catch (e) {
      res.json({ err: e.message });
    }
  };
  //Handle Github hook events.
  public hookEvents: defaultRouteHandler = async (req, res) => {
    try {
      const body = await req.json();
      console.log(body);
      const { action } = body;
      if (action === 'revoked') {
        //TODO implement app revoke
        //TODO Drop user data?
        //https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#github_app_authorization=

        const discordWebhookBody = {
          title: `Github revoked for ${body.sender.login}`,
          description: `user authorization removed`,
        };
        pushDiscordWebhook(discordWebhookBody);
      }
      res.end();
    } catch (e) {
      res.json({ err: e.message });
    }
  };
}

export default GithubAuthController;
