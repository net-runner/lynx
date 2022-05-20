import db from '../lib/db';
import { Link } from '../../interfaces';

export async function addLink(link: Link) {
  try {
    const { link: linkHref, description, owner, group, privacyLevel } = link;
    const newLink = await db.link.create({
      data: {
        link: linkHref,
        description,
        owner,
        group: group || '',
        privacyLevel,
        stars: 0,
      },
    });
    return newLink;
  } catch (e) {
    throw new Error(e);
  }
}
