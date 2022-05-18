import axios from 'axios';
import { Router } from 'hyper-express';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';
import { getGoogleOAuthTokens } from '../../services/user';
import jwt from 'jsonwebtoken';
const { GOOGLE_APP_ID, GOOGLE_APP_SECRET, FRONTEND_URL, API_URL, NODE_ENV } =
  process.env;

const env = process.env.NODE_ENV;
const isDev = env === 'development';
console.log(env);
const googleRouter = new Router();

googleRouter.get('/', async (req, res) => {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth';
  const body = {
    redirect_uri: `${
      isDev ? 'http://localhost/' : API_URL
    }auth/signin/google/callback`,
    client_id: GOOGLE_APP_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };
  const qs = new URLSearchParams(body);
  res.redirect(`${url}?${qs}`);
});

googleRouter.get('/callback', async (req, res) => {
  const code = req.query.code as string;
  try {
    const tokenBundle = await getGoogleOAuthTokens(code);

    console.log(tokenBundle);

    const googleUser = await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenBundle.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenBundle.id_token}`,
          },
        }
      )
      .then((res) => res.data);

    console.log(googleUser);
    const webhBody = {
      embeds: [
        {
          title: `Google new user: ${googleUser.email}`,
          description: `user authorization accepted`,
        },
      ],
    };
    pushDiscordWebhook(webhBody);
    //TODO add user to database, forward token data to frontend
    res.redirect(FRONTEND_URL);
  } catch (e) {
    console.error({ err: e.message, desc: e.response.data.error_description });
    res.json({ err: e.message, desc: e.response.data.error_description });
  }

  res.redirect(FRONTEND_URL);
});

export default googleRouter;
