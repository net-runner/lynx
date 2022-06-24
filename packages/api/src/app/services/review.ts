import { Review } from '@prisma/client';
import db from '../lib/db';

export async function createReview(review: Omit<Review, 'id' | 'link'>) {
  return await db.review.create({ data: review });
}
