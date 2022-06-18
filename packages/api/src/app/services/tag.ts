import { LinkGroup } from '@prisma/client';
import log from '../helpers/logger';
import { getFromCache, setExCache } from '../helpers/redis';
import db from '../lib/db';

export const getTags = async () => {
  const cachedTags = await getFromCache('allTags');

  if (cachedTags) {
    return cachedTags;
  }
  const tags = await db.tag.findMany({
    include: {
      _count: {
        select: {
          Groups: true,
        },
      },
    },
    orderBy: {
      Groups: {
        _count: 'desc',
      },
    },
  });
  setExCache('allTags', 3600, JSON.stringify(tags));
  return tags;
};
export const createTag = async (tag) => {
  return await db.tag.create(tag);
};
export const getTagLinkGroups = async (tagName: string) => {
  try {
    const { Groups } = await db.tag.findUnique({
      where: {
        name: tagName,
      },
      select: {
        Groups: {
          select: {
            group: {
              include: {
                tags: true,
              },
            },
          },
        },
      },
    });
    const linkGroups: LinkGroup[] = [];
    for (let index = 0; index < Groups.length; index++) {
      const element = Groups[index].group;
      linkGroups.push(element);
    }
    return linkGroups;
  } catch (error) {
    log.error(error);
    return [];
  }
};
