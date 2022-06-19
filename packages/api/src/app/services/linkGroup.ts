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
        groupname: linkGroup.name.toLowerCase().replaceAll(' ', '-'),
        user: { connect: { id: owner } },
      },
    });
  } catch (e) {
    log.error(e);
    return false;
  }
}

export async function editLinkGroupInDatabase(updatedLinkGroup, linkGroupId) {
  try {
    updatedLinkGroup = hideSelectedObjectKeys(updatedLinkGroup, [
      'id',
      'owner',
      'user',
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
    log.error(e);
    return false;
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
    log.error(e);
    return false;
  }
}

export async function incrementLinkGroupLinkedCount(linkGroupId) {
  try {
    console.log(linkGroupId);
    const linkGroupFromDb = await db.linkGroup.update({
      data: { linkedCount: { increment: 1 } },
      where: {
        id: linkGroupId,
      },
    });
    if (!linkGroupFromDb) return null;
    return linkGroupFromDb;
  } catch (e) {
    log.error(e);
    return false;
  }
}

export async function getLinkGroupsFromDatabase(
  limit,
  page,
  skip,
  privacyLevels
) {
  try {
    const includedPrivacyLevels = [];
    privacyLevels.forEach((privacyLevel) => {
      includedPrivacyLevels.push({ privacyLevel: Number(privacyLevel) });
    });

    const linkGroupsFromDb = await db.linkGroup.findMany({
      skip: limit * page + skip,
      take: limit,
      include: {
        tags: true,
      },
      where: {
        OR: includedPrivacyLevels,
      },
    });
    if (!linkGroupsFromDb) return null;
    return linkGroupsFromDb;
  } catch (e) {
    log.error(e);
    return false;
  }
}
