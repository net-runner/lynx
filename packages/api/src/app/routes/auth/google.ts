import { Router } from 'hyper-express';
import pushDiscordWebhook from '../../helpers/pushDiscordWebhook';
import {
  AuthProvider,
  findOrCreateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
} from '../../services/user';
import { authorizeAndEnd } from '../../helpers/authorizeAndEnd';
const { GOOGLE_APP_ID, API_URL } = process.env;

const env = process.env.NODE_ENV;
const isDev = env === 'development';
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

    //Get google user from GoogleAPI || also possible to decode from token
    const googleUser = await getGoogleUser(
      tokenBundle.id_token,
      tokenBundle.access_token
    );

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
    const user = await findOrCreateUser(googleUser, AuthProvider.Google);

    authorizeAndEnd(user, req, res);
  } catch (e) {
    console.error({ err: e.message, desc: e.response.data.error_description });
    res.json({ err: e.message, desc: e.response.data.error_description });
  }
});

export default googleRouter;