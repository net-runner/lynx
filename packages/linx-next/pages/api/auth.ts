import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const access_token = req.cookies['access_token'];
  const refresh_token = req.cookies['refresh_token'];
  res
    .status(200)
    .json({ hasAuthCookies: access_token || refresh_token ? true : false });
}
