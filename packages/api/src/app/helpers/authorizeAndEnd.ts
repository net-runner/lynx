import { User } from '@prisma/client';
import { createSession } from '../services/session';
import {
  Request,
  Response,
  DefaultRequestLocals,
  DefaultResponseLocals,
} from 'hyper-express';
import { signJwt } from './jwt';
import { cookieOptions, refreshCookieOptions } from './cookie';
import { AuthProvider } from '../services/user';

const env = process.env.NODE_ENV;

const isProduction = env === 'production';

//Helper function for getting and setting user tokens
export async function authorizeAndEnd(
  user: User,
  req: Request<DefaultRequestLocals>,
  res: Response<DefaultResponseLocals>,
  authProvider: AuthProvider,
  isLocal?: boolean
) {
  //Create new session
  const session = await createSession(
    user.id,
    req.get('user-agent') || 'No agent detected',
    req.ip,
    authProvider
  );

  //Create access & refresh tokens

  const access_token = signJwt(
    { user: user.id, session: session.id },
    { expiresIn: '15m' }
  );

  const refresh_token = signJwt(
    { user: user.id, session: session.id },
    { expiresIn: '1y' }
  );

  //Set user cookies
  res.cookie('access_token', access_token, 15 * 60, cookieOptions);

  res.cookie(
    'refresh_token',
    refresh_token,
    365 * 24 * 60 * 60,
    refreshCookieOptions
  );

  //Redirect to webapp if not credential authorization.
  if (!isLocal)
    return res
      .status(302)
      .redirect(
        isProduction
          ? process.env.FRONTEND_URL + 'home'
          : 'http://localhost:4200/home'
      );

  //Or if local just end
  return res.status(200).end();
}
