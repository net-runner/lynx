import db from '../lib/db';
import { Link } from '../../interfaces';

export async function addLinkToDb(link: Link) {
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
