import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Router } from 'hyper-express';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';
const { GOOGLE_APP_ID, GOOGLE_APP_SECRET, FRONTEND_URL, API_URL } = process.env;

const googleRouter = new Router();
console.log(GOOGLE_APP_ID);
console.log(GOOGLE_APP_SECRET);

googleRouter.get('/', async (req, res) => {
  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_APP_ID}&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&redirect_uri=${API_URL}auth/signin/google/callback`
  );
});
googleRouter.get('/url', (req, res) => {
  return res.send(
    `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_APP_ID}&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&redirect_uri=${API_URL}auth/signin/google/callback`
  );
});

googleRouter.get('/callback', async (req, res) => {
  res.send('amogus');
});
export default googleRouter;
