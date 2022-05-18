import { User } from '@prisma/client';
import axios from 'axios';
import * as qs from 'qs';
import db from '../lib/db';

const { GOOGLE_APP_ID, GOOGLE_APP_SECRET, API_URL, NODE_ENV } = process.env;

interface TokenBundle {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  scope: string;
}

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const opts = { headers: { accept: 'application/json' } };

export async function getGoogleOAuthTokens(code: string): Promise<TokenBundle> {
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

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
export async function getGoogleUser(
  id_token: string,
  access_token: string
): Promise<GoogleUser> {
  const url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json';

  try {
    return axios
      .get(`${url}&access_token=${access_token}`, {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      })
      .then((res) => res.data);
  } catch (e) {
    console.error(e.response.data.error_description);
    throw new Error(e);
  }
}
export enum AuthProvider {
  Local,
  GitHub,
  Google,
}
export async function findOrCreateUser(
  user: GoogleUser,
  authProvider: AuthProvider
) {
  try {
    const getUser: User | null = await db.user.findFirst({
      where: {
        email: user.email,
      },
    });
    if (!getUser) {
      await db.user.create({
        data: {
          email: user.email,
          password: 'x',
          authProvider: authProvider,
          name: user.name,
        },
      });
    }
  } catch (e) {
    throw new Error(e);
  }
}
