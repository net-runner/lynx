import { CookieOptions } from 'hyper-express';

const { FRONTEND_URL } = process.env;
const env = process.env.NODE_ENV;
const isDev = env === 'development';

export const cookieOptions: CookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  domain: isDev ? 'localhost' : FRONTEND_URL,
  path: '/',
  sameSite: 'strict',
  secure: false,
};
