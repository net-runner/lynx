import { CookieOptions } from 'hyper-express';

const { FRONTEND_URL } = process.env;
const env = process.env.NODE_ENV;

const isProduction = env === 'production';

export const cookieOptions: CookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  domain: FRONTEND_URL,
  path: '/',
  sameSite: isProduction ? 'strict' : 'lax',
  secure: isProduction,
};
export const refreshCookieOptions: CookieOptions = {
  ...cookieOptions,
  maxAge: 31536000000,
};
