import db from '../lib/db';

export const getAllStats = async () => {
  const allUsers = await db.user.count();
  const allLinks = await db.link.count();
  const allLinkGroups = await db.linkGroup.count();
  const allTags = await db.tag.count();
  const allReviews = await db.review.count();

  return {
    users: allUsers,
    links: allLinks,
    linkGroups: allLinkGroups,
    tags: allTags,
    review: allReviews,
  };
};
