import db from '../lib/db';

export async function createLink(link) {
  try {
    const { link: linkHref, description, owner, group, privacyLevel } = link;
    return await db.link.create({
      data: {
        link: linkHref,
        description,
        owner,
        group,
        privacyLevel,
        stars: 0,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function getLinkFromDatabase(linkId) {
  try {
    const linkFromDb = await db.link.findFirst({
      where: {
        id: linkId,
      },
    });
    if (!linkFromDb) return null;
    return linkFromDb;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getLinksFromDatabase(limit, page) {
  try {
    const linksFromDb = await db.link.findMany({
      skip: limit * page,
      take: limit,
    });
    if (!linksFromDb) return null;
    return linksFromDb;
  } catch (e) {
    throw new Error(e);
  }
}
