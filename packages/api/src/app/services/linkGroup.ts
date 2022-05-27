import db from '../lib/db';
import {
  hideObjectKeysWithoutValues,
  hideSelectedObjectKeys,
} from '../helpers/utilsJS';
import log from '../helpers/logger';

export async function createLinkGroup(linkGroup) {
  try {
    const { owner } = linkGroup;
    linkGroup = hideSelectedObjectKeys(linkGroup, [
      'id',
      'stars',
      'watcherCount',
      'linkedCount',
      'linksAmount',
      'owner',
    ]);
    return await db.linkGroup.create({
      data: {
        ...linkGroup,
        userId: { connect: { id: owner } },
      },
    });
  } catch (e) {
    log.error(e);
    throw new Error();
  }
}

export async function editLinkGroupInDatabase(updatedLinkGroup, linkGroupId) {
  try {
    updatedLinkGroup = hideSelectedObjectKeys(updatedLinkGroup, [
      'id',
      'owner',
      'userId',
    ]);
    updatedLinkGroup = hideObjectKeysWithoutValues(updatedLinkGroup);
    const linkGroupFromDb = await db.linkGroup.update({
      data: updatedLinkGroup,
      where: {
        id: linkGroupId,
      },
    });
    if (!linkGroupFromDb) return null;
    return linkGroupFromDb;
  } catch (e) {
    throw new Error(e);
  }
}

export async function deleteLinkGroupFromDatabase(linkGroupId) {
  try {
    await db.linkGroup.delete({
      where: {
        id: linkGroupId,
      },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getLinkGroupFromDatabase(linkGroupId) {
  try {
    const linkGroupFromDb = await db.linkGroup.findFirst({
      where: {
        id: linkGroupId,
      },
    });
    if (!linkGroupFromDb) return null;
    return linkGroupFromDb;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getLinkGroupsFromDatabase(limit, page) {
  try {
    const linkGroupsFromDb = await db.linkGroup.findMany({
      skip: limit * page,
      take: limit,
    });
    if (!linkGroupsFromDb) return null;
    return linkGroupsFromDb;
  } catch (e) {
    throw new Error(e);
  }
}
