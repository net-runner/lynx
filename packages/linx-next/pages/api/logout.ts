import type { NextApiRequest, NextApiResponse } from 'next';
import Cookie from 'cookies';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookie(req, res);

  cookies.set('access_token');
  cookies.set('refresh_token');

  res.status(200).end();
}
