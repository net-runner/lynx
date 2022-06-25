import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = req.cookies['access_token'];
  const refresh_token = req.cookies['refresh_token'];

  if (!access_token || !refresh_token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const body = JSON.parse(req.body);
  const { refresh_route } = body;
  if (!refresh_route || typeof refresh_route !== 'string')
    return res.status(400).json({ message: 'Bad Request: No paths specified' });

  try {
    await res.unstable_revalidate(refresh_route);
    return res.json({ revalidated: true });
  } catch (err) {
    // Catch error and serve 500
    return res.status(500).send('Error revalidating');
  }
}
