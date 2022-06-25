import type { NextApiRequest, NextApiResponse } from 'next';
import Cookie from 'cookies';
export default async function handler(req, res) {
  const cookies = new Cookie(req, res);

  const at = cookies.get('access_token');
  const rt = cookies.get('refresh_token');

  if (at && rt) {
    if (req.query.secret !== process.env.REFRESH_SECRET) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const refresh_path = req.body.refresh_path;

    if (!refresh_path || typeof refresh_path !== 'string')
      return res
        .status(400)
        .json({ message: 'Bad Request: No paths specified' });

    try {
      await res.revalidate(refresh_path);
      return res.json({ revalidated: true });
    } catch (err) {
      // Catch error and serve 500
      return res.status(500).send('Error revalidating');
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
