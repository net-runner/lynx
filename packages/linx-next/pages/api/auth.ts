import type { NextApiRequest, NextApiResponse } from 'next';
import Cookie from 'cookies';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookie(req, res);

  const access_token = cookies.get('access_token');
  const refresh_token = cookies.get('refresh_token');

  res
    .status(200)
    .json({ hasAuthCookies: access_token || refresh_token ? true : false });
}
