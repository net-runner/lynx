import { Review } from '@prisma/client';
import { deleteFromCache, getFromCache, setExCache } from '../helpers/redis';
import db from '../lib/db';

export async function createReview(review: Omit<Review, 'id' | 'link'>) {
  const r = await db.review.create({ data: review });
  setExCache(r.id, 36000, JSON.stringify(r));
  return r;
}
export async function deleteReview(id: string, creatorName: string) {
  const cachedReview = await getFromCache(id);

  let rev;
  if (cachedReview) {
    rev = cachedReview;
  } else {
    rev = await db.review.findUnique({ where: { id } });
  }

  if (rev && rev.creatorName === creatorName) {
    deleteFromCache(id);
    return await db.review.delete({ where: { id } });
  }
}
