import { Session } from '@prisma/client';
import db from '../lib/db';

export async function createSession(userId: string, userAgent: string) {
  const session = await db.session.create({
    data: {
      user: userId,
      userAgent,
    },
  });

  return session;
}
export async function findSession(userId: string) {
  return db.session.findFirst({ where: { user: userId } });
}

export async function updateSession(sessionId: string, data) {
  return db.session.update({
    where: {
      id: sessionId,
    },
    data: data,
  });
}
