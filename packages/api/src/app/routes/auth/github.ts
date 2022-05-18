import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Router } from 'hyper-express';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';
import { AuthProvider, findOrCreateUser } from '../../services/user';
import { GithubUser } from '../../services/user.types';
import { authorizeAndEnd } from '../../helpers/authorizeAndEnd';

const githubRouter = new Router();
const { GITHUB_APP_SECRET, GITHUB_APP_ID, FRONTEND_URL } = process.env;

//Dictionary for request state checks
const stateDict = {};

//Route for Oauth login with github
githubRouter.get('/', async (req, res) => {
  if (!GITHUB_APP_ID) {
    res.send('GitHub app id not specified');
  }
  const state = uuidv4();
  stateDict[state] = new Date().getMilliseconds() + 5 * 60 * 1000;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_ID}&state=${state}`
  );
});

//Route for Oauth login callback
//handle cancelation + token requesting
githubRouter.get('/callback', async (req, res) => {
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

    console.log(tokenBundle);
    console.log(githubUser);

    const webhBody = {
      embeds: [
        {
          title: `Github new user: ${githubUser.login}`,
          description: `user authorization accepted`,
        },
      ],
    };
    pushDiscordWebhook(webhBody);
    const user = await findOrCreateUser(githubUser, AuthProvider.GitHub);

    authorizeAndEnd(user, req, res);
  } catch (e) {
    res.json({ err: e.message });
  }
});

//Handle Github hook events.
githubRouter.post('/hook', async (req, res) => {
  const body = await req.json();
  console.log(body);
  const { action } = body;
  if (action === 'revoked') {
    //TODO implement app revoke
    //TODO Drop user data?
    //https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#github_app_authorization=

    const webhBody = {
      embeds: [
        {
          title: `Github revoked for ${body.sender.login}`,
          description: `user authorization removed`,
        },
      ],
    };

    pushDiscordWebhook(webhBody);
  }
  res.end();
});

export default githubRouter;
