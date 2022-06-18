import { signJwt, verifyJwt } from '../helpers/jwt';
import log from '../helpers/logger';
import { deleteFromCache, getFromCache, setExCache } from '../helpers/redis';
import db from '../lib/db';
import { AuthProvider, getUserById } from './user';

export async function createSession(
  userId: string,
  userAgent: string,
  ip: string,
  authProvider: AuthProvider
) {
  const session = await db.session.create({
    data: {
      userId,
      userAgent,
      ip,
      authProvider,
    },
  });
  setExCache(session.id, 9000, JSON.stringify(session));
  return session;
}

export async function removeSession(sessionId: string) {
  try {
    deleteFromCache(sessionId);
    await db.session.delete({ where: { id: sessionId } });
  } catch (e) {
    log.error(e);
  }
}

export async function removeAllSessions(userId: string) {
  await db.session.deleteMany({ where: { userId } });
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
    setExCache(sessionId, 9000, JSON.stringify(session));
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

  const user = await getUserById(decoded.user);

  if (!user) return false;
  const accessToken = signJwt(
    { user: user.id, session: session.id },
    { expiresIn: '15m' }
  );

  return accessToken;
}
