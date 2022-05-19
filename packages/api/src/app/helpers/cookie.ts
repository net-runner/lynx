import { CookieOptions } from 'hyper-express';

const { FRONTEND_URL } = process.env;
const env = process.env.NODE_ENV;

export const cookieOptions: CookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  domain: FRONTEND_URL,
  path: '/',
  sameSite: 'strict',
  secure: false,
};

export const refreshCookieOptions: CookieOptions = {
  ...cookieOptions,
  maxAge: 3.154e10,
};
