import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Router } from 'hyper-express';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';

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

  await axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data)
    .then((git_res) => {
      //https://docs.github.com/en/developers/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps
      const oauthToken = git_res.access_token;
      axios
        .get('https://api.github.com/user', {
          headers: { Authorization: `token ${oauthToken}` },
        })
        .then((_res) => _res.data)
        .then((git_user_data) => {
          console.log(git_user_data);
          const webhBody = {
            embeds: [
              {
                title: `Github new user: ${git_user_data.login}`,
                description: `user authorization accepted`,
              },
            ],
          };
          pushDiscordWebhook(webhBody, res).then(() => res.end());
          //TODO add user to database, forward token data to frontend
        });
    })
    .catch((err) => res.status(500).json({ err: err.message }));

  res.redirect(FRONTEND_URL);
});

//Handle Github hook events.
githubRouter.post('/hook', async (req, res) => {
  const body = await req.json();
  const { action } = body;
  if (action === 'revoked') {
    //TODO implement app revoke
    //TODO Drop user data?
    //https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#github_app_authorization=

    const webhBody = {
      embeds: [
        {
          title: `Github revoked for ${body.login}`,
          description: `user authorization removed`,
        },
      ],
    };

    await pushDiscordWebhook(webhBody, res).then(() => res.end());
  } else {
    res.end();
  }
});

export default githubRouter;
