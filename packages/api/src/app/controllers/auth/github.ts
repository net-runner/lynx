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

class GithubAuthController {
  //Route for Oauth login with github
  public oauthRedirect: defaultRouteHandler = async (req, res) => {
    if (!GITHUB_APP_ID) {
      res.send('GitHub app id not specified');
    }
    const state = uuidv4();
    stateDict[state] = new Date().getMilliseconds() + 5 * 60 * 1000;
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_ID}&state=${state}&scope=read:user,user:email`
    );
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

      const githubUserEmail = (await axios
        .get('https://api.github.com/user/email', {
          headers: { Authorization: `token ${tokenBundle.access_token}` },
        })
        .then((_res) => _res.data[0].email)) as string;

      log.info(tokenBundle);
      log.info(githubUser);

      githubUser.email = githubUserEmail;

      const user = await findOrCreateUser(githubUser, AuthProvider.GitHub);

      const discordWebhookBody = {
        title: `Github new user: ${githubUser.login}`,
        description: `user authorization accepted for ${githubUserEmail}`,
      };
      pushDiscordWebhook(discordWebhookBody);
      authorizeAndEnd(user, req, res);
    } catch (e) {
      res.json({ err: e.message });
    }
  };
  //Handle Github hook events.
  public hookEvents: defaultRouteHandler = async (req, res) => {
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
  };
}

export default GithubAuthController;
