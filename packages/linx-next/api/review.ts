import { Review } from '@prisma/client';

export const addReview = async (data: Omit<Review, 'id' | 'link'>) => {
  try {
    return await (
      await fetch(`${process.env.FRONTEND_URL}/api/review/add`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    ).json();
  } catch (error) {
    console.log('E ' + error);
  }
};
export const removeReview = async (id: string) => {
  try {
    return await (
      await fetch(`${process.env.FRONTEND_URL}/api/review/${id}`, {
        method: 'DELETE',
      })
    ).json();
  } catch (error) {
    console.log('E ' + error);
  }
};
