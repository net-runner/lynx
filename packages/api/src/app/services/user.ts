import { User } from '@prisma/client';
import axios from 'axios';
import log from '../helpers/logger';
import { getFromCache, setExCache } from '../helpers/redis';
import db from '../lib/db';
import * as qs from 'qs';
import { GoogleUser, LynxUser } from './user.types';
import { PrivacyLevels } from '../../interfaces';

const { GOOGLE_APP_ID, GOOGLE_APP_SECRET, FRONTEND_URL } = process.env;

interface TokenBundle {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  scope: string;
}

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const opts = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export async function getGoogleOAuthTokens(code: string): Promise<TokenBundle> {
  const url = 'https://oauth2.googleapis.com/token';

  const body = {
    code: decodeURIComponent(code),
    client_id: GOOGLE_APP_ID,
    client_secret: GOOGLE_APP_SECRET,
    redirect_uri: `${
      isDev ? 'http://localhost:4200/' : FRONTEND_URL
    }api/auth/signin/google/callback`,
    grant_type: 'authorization_code',
  };
  try {
    return axios.post(url, qs.stringify(body), opts).then((res) => res.data);
  } catch (e) {
    log.error(e);
    throw new Error(e);
  }
}

export async function getAllUserGroups(username: string) {
  return await db.user.findUnique({
    where: {
      username,
    },
    select: {
      linkGroups: {
        include: {
          tags: true,
        },
        where: {
          privacyLevel: PrivacyLevels.PUBLIC,
        },
      },
    },
  });
}

export async function getAllUsersWithGroups() {
  return await db.user.findMany({
    include: { linkGroups: true },
  });
}

export async function getAllUserGroupLinks(
  username: string,
  groupname: string
) {
  return await db.linkGroup.findUnique({
    where: {
      owner_groupname: {
        owner: username,
        groupname,
      },
    },
    include: {
      links: true,
      tags: true,
      reviews: {
        include: {
          creatorId: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
}

export async function getAllUsers() {
  const cachedUsers = await getFromCache('allUsers');

  if (cachedUsers) {
    return cachedUsers;
  }
  const users = await db.user.findMany({
    select: {
      username: true,
    },
  });
  setExCache('allUsers', 3600, JSON.stringify(users));
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
    return false;
  } else {
    const getUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    setExCache(email, 3600, JSON.stringify(getUser));
    return getUser === null;
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
  const cachedUser = false;

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
