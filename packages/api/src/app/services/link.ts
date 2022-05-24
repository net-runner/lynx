import db from '../lib/db';
import {
  hideObjectKeysWithoutValues,
  hideSelectedObjectKeys,
} from '../helpers/utilsJS';
import { deleteFromCache, setExCache } from '../helpers/redis';

export async function createLink(link) {
  try {
    link = hideSelectedObjectKeys(link, ['id', 'stars']);
    const newLink = await db.link.create({
      data: {
        ...link,
        stars: 0,
      },
    });
    //Cache after create
    await setExCache(newLink.id, 3600, JSON.stringify(newLink));
    return newLink;
  } catch (e) {
    throw new Error(e);
  }
}

export async function editLinkInDatabase(updatedLink, linkId) {
  try {
    updatedLink = hideSelectedObjectKeys(updatedLink, ['owner', 'id']);
    updatedLink = hideObjectKeysWithoutValues(updatedLink);
    const linkFromDb = await db.link.update({
      data: updatedLink,
      where: {
        id: linkId,
      },
    });
    //Cache after edit
    await setExCache(linkFromDb.id, 3600, JSON.stringify(linkFromDb));
    if (!linkFromDb) return null;
    return linkFromDb;
  } catch (e) {
    throw new Error(e);
  }
}

export async function deleteLinkFromDatabase(linkId) {
  try {
    await db.link.delete({
      where: {
        id: linkId,
      },
    });
    deleteFromCache(linkId);
    return true;
  } catch {
    return false;
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
