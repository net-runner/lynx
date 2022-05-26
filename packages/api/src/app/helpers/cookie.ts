import { CookieOptions } from 'hyper-express';

const { COOKIE_DOMAIN } = process.env;
const env = process.env.NODE_ENV;

const isProduction = env === 'production';

export const cookieOptions: CookieOptions = {
  maxAge: 15 * 60,
  httpOnly: false,
  domain: isProduction ? COOKIE_DOMAIN : 'localhost',
  path: '/',
  sameSite: 'lax',
  secure: isProduction,
};
export const refreshCookieOptions: CookieOptions = {
  ...cookieOptions,
  maxAge: 365 * 24 * 60 * 60,
};
