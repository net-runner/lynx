import { User } from '@prisma/client';
import axios from 'axios';
import log from '../helpers/logger';
import { getFromCache, setExCache } from '../helpers/redis';
import db from '../lib/db';
import { GoogleUser, LynxUser } from './user.types';

const { GOOGLE_APP_ID, GOOGLE_APP_SECRET, API_URL } = process.env;

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
  log.info(body);
  try {
    return axios.post(url, body, opts).then((res) => res.data);
  } catch (e) {
    console.error(e.response.data.error_description);
    throw new Error(e);
  }
}

export async function getAllUserGroups(username: string) {
  const uLinkgroups = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      linkGroups: true,
    },
  });

  return uLinkgroups;
}

export async function getAllUsersWithGroups() {
  const uWLinkgroups = await db.user.findMany({
    include: { linkGroups: true },
  });
  return uWLinkgroups;
}

export async function getAllUserGroupLinks(
  username: string,
  groupname: string
) {
  const links = await db.linkGroup.findUnique({
    where: {
      owner_groupname: {
        owner: username,
        groupname,
      },
    },
    include: {
      links: true,
    },
  });
  return links;
}

export async function getAllUsers() {
  return await db.user.findMany({
    select: {
      username: true,
    },
  });
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
    log.error(e.response.data.error_description);
    throw new Error(e);
  }
}
export enum AuthProvider {
  Local,
  GitHub,
  Google,
}
export async function isEmailFree(email: string): Promise<boolean> {
  const cachedUser = await getFromCache(email);

  if (cachedUser) {
    return cachedUser;
  } else {
    const getUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    setExCache(email, 3600, JSON.stringify(getUser));
    return getUser === null ? true : false;
  }
}

export async function getUser(email: string): Promise<User> {
  const cachedUser = await getFromCache(email);

  if (cachedUser) {
    return cachedUser;
  } else {
    const user = await db.user.findUnique({ where: { email } });
    setExCache(email, 3600, JSON.stringify(user));
    return user;
  }
}
export async function getUserById(userId: string): Promise<User> {
  log.info('USR-id: ' + userId);
  const cachedUser = await getFromCache(userId);

  if (cachedUser) {
    return cachedUser;
  } else {
    const user = await db.user.findUnique({ where: { id: userId } });
    setExCache(userId, 3600, JSON.stringify(user));
    return user;
  }
}

export async function findOrCreateUser(
  user: LynxUser,
  authProvider: AuthProvider
): Promise<User> {
  try {
    const oldUser: User | null = await getUser(user.email);
    if (!oldUser) {
      const newUser = await db.user.create({
        data: {
          email: user.email,
          username: user.name.toLowerCase().replaceAll(' ', '-'),
          password: user.password || 'x',
          authProvider: authProvider,
          name: user.name,
        },
      });
      setExCache(newUser.id, 3600, JSON.stringify(user));
      return newUser;
    }
    setExCache(oldUser.id, 3600, JSON.stringify(user));
    return oldUser;
  } catch (e) {
    throw new Error(e);
  }
}
