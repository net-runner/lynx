import axios from 'axios';
import { Router } from 'hyper-express';
import { uuid } from 'uuid';
const { GITHUB_APP_SECRET, GITHUB_APP_ID, FRONTEND_URL } = process.env;

const authRouter = new Router();

authRouter.post('/signin', async (req, res) => {
  return 'amogus';
});

authRouter.post('/singup', async (req, res) => {
  return 'amogus';
});

const stateDict = {};

//Route for Oauth login with github
authRouter.get('/signin/github', async (req, res) => {
  if (!GITHUB_APP_ID) {
    res.send('GitHub app id not specified');
  }
  const state = uuid.v4();
  stateDict[state] = new Date().getMilliseconds() + 5 * 60 * 1000;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_ID}&state=${state}`
  );
});

//Route for Oauth login callback
//handle cancelation + token requesting
authRouter.get('/signin/github/callback', async (req, res) => {
  const { error, code, state } = req.body;
  if (error) {
    res.redirect(FRONTEND_URL);
  }
  if (!stateDict[state]) {
    res.send('State diff, posible cross-forgery attempt');
  }
  delete stateDict[state];
  const body = {
    client_id: GITHUB_APP_ID,
    client_secret: GITHUB_APP_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };

  let oauthToken = null;
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data)
    .then((git_res) => {
      oauthToken = git_res.access_token;

      res.redirect(`/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});

//Handle Github hook events.
authRouter.post('/signin/github/hook', async (req, res) => {
  const { action } = req.body;
  console.log(action);
  if (action === 'revoked') {
    //TODO implement app revoke
    //https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#github_app_authorization=
  }
  const state = uuid.v4();
  stateDict[state] = new Date().getMilliseconds() + 5 * 60 * 1000;
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_ID}&state=${state}`
  );
});

authRouter.get('/signin/google', async (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize');
});

export default authRouter;
