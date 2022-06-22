import db from '../lib/db';
import {
  hideObjectKeysWithoutValues,
  hideSelectedObjectKeys,
} from '../helpers/utilsJS';
import log from '../helpers/logger';
import { PrivacyLevels } from '../../interfaces';
import { getFromCache, setExCache } from '../helpers/redis';

export async function isLinkGroupFree(
  groupname: string,
  owner: string
): Promise<boolean> {
  const cachedGroup = await getFromCache(`${groupname}${owner}`);

  if (cachedGroup) {
    return false;
  } else {
    const getGroup = await db.linkGroup.findUnique({
      where: {
        owner_groupname: {
          groupname,
          owner,
        },
      },
    });
    setExCache(`${groupname}${owner}`, 3600, JSON.stringify('x'));
    return getGroup === null;
  }
}

export async function createLinkGroup(linkGroup, ownerId) {
  try {
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
        groupname: linkGroup.groupname.toLowerCase().replaceAll(' ', '-'),
        user: { connect: { id: ownerId } },
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
  limit: number,
  page: number,
  skip: number,
  privacyLevel: PrivacyLevels,
  specificUsername?: string | undefined
) {
  try {
    const linkGroupsFromDb = await db.linkGroup.findMany({
      skip: limit * page + skip,
      take: limit,
      include: {
        tags: true,
      },
      where: {
        AND: {
          privacyLevel: Number(privacyLevel),
          owner: specificUsername,
        },
      },
    });
    if (!linkGroupsFromDb) return null;
    return linkGroupsFromDb;
  } catch (e) {
    log.error(e);
    return false;
  }
}
