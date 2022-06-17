import { LinkGroup } from '@prisma/client';
import { getFromCache, setExCache } from '../helpers/redis';
import db from '../lib/db';

export const getTags = async () => {
  const cachedTags = await getFromCache('allTags');

  if (cachedTags) {
    return cachedTags;
  }
  const tags = await db.tag.findMany();
  setExCache('allTags', 3600, JSON.stringify(tags));
};
export const createTag = async (tag) => {
  return await db.tag.create(tag);
};
export const getTagLinkGroups = async (tagName: string) => {
  const { Groups } = await db.tag.findUnique({
    where: {
      name: tagName,
    },
    select: {
      Groups: {
        select: {
          groupId: {
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
    const element = Groups[index].groupId;
    linkGroups.push(element);
  }
  return linkGroups;
};
