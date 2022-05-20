import db from '../lib/db';

export async function addLink(link) {
  try {
    const { link: linkHref, description, owner, group, privacyLevel } = link;
    const newLink = await db.link.create({
      data: {
        link: linkHref,
        description,
        owner,
        group,
        privacyLevel,
        stars: 0,
      },
    });
    return newLink;
  } catch (e) {
    throw new Error(e);
  }
}
