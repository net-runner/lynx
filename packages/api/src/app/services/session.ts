import { signJwt, verifyJwt } from '../helpers/jwt';
import { getFromCache, setExCache } from '../helpers/redis';
import db from '../lib/db';

export async function createSession(userId: string, userAgent: string) {
  const session = await db.session.create({
    data: {
      user: userId,
      userAgent,
    },
  });
  setExCache(session.id, 900, JSON.stringify(session));
  return session;
}
export async function findSession(sessionId: string) {
  const cachedResponse = await getFromCache(sessionId);
  if (cachedResponse) {
    return cachedResponse;
  } else {
    const session = await db.session.findUnique({
      where: {
        id: sessionId,
      },
    });
    setExCache(sessionId, 900, JSON.stringify(session));
    return session;
  }
}

export async function updateSession(sessionId: string, data) {
  return db.session.update({
    where: {
      id: sessionId,
    },
    data,
  });
}

export async function tokenRefresh(refresh_token: string) {
  const { decoded } = verifyJwt(refresh_token);

  const session = await findSession(decoded.session);

  if (!session || !session.valid) return false;

  const user = await db.user.findUnique({ where: { id: session.user } });

  if (!user) return false;

  const accessToken = signJwt(
    { user: user.id, session: session.id },
    { expiresIn: '15m' }
  );

  return accessToken;
}
