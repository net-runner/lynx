import db from '../lib/db';

export const getTags = async () => {
  return await db.tag.findMany();
};
