import axios from 'axios';
import * as qs from 'qs';

const { GOOGLE_APP_ID, GOOGLE_APP_SECRET, API_URL } = process.env;

interface GoogleTokenBundle {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  scope: string;
}

export async function getGoogleOAuthTokens(
  code: string
): Promise<GoogleTokenBundle> {
  const url = 'https://oauth2.googleapis.com/token';

  const body = {
    code,
    client_id: GOOGLE_APP_ID,
    client_secret: GOOGLE_APP_SECRET,
    redirect_uri: `${API_URL}auth/api/google/callback`,
    grant_type: 'authorization_code',
  };
  try {
    return axios
      .post(url, qs.stringify(body), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => res.data);
  } catch (e) {
    console.error(e.response.data.error);
    throw new Error(e);
  }
}
