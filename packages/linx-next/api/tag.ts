import { Tag } from '@prisma/client';

export async function getTags() {
  const tags = (await fetch(`${process.env.FRONTEND_URL}api/tag`).then((res) =>
    res.json()
  )) as (Tag & { _count: { Groups: number } })[];
  return tags;
}
