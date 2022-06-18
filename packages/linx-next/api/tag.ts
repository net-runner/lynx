import { GroupTag, Tag } from '@prisma/client';

export async function getTags() {
  const tags = (await fetch(`${process.env.FRONTEND_URL}api/tag`).then((res) =>
    res.json()
  )) as (Tag & { _count: { Groups: number } })[];
  return tags;
}
export async function addMultipleGroupTags(data: Omit<GroupTag, 'id'>[]) {
  const res = await fetch(`${process.env.FRONTEND_URL}api/tag/add/group/many`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res;
}
