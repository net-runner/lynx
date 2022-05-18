import axios from 'axios';
import * as qs from 'qs';

const { GOOGLE_APP_ID, GOOGLE_APP_SECRET, API_URL, NODE_ENV } = process.env;

interface GoogleTokenBundle {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  scope: string;
}

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const opts = { headers: { accept: 'application/json' } };
export async function getGoogleOAuthTokens(
  code: string
): Promise<GoogleTokenBundle> {
  const url = 'https://oauth2.googleapis.com/token';

  const body = {
    code: decodeURIComponent(code),
    client_id: GOOGLE_APP_ID,
    client_secret: GOOGLE_APP_SECRET,
    redirect_uri: `${
      isDev ? 'http://localhost/' : API_URL
    }auth/signin/google/callback`,
    grant_type: 'authorization_code',
  };
  console.log(body);
  try {
    return axios.post(url, body, opts).then((res) => res.data);
  } catch (e) {
    console.error(e.response.data.error_description);
    throw new Error(e);
  }
}
