import { Link } from '@prisma/client';

export const addLink = async (
  link: string,
  description: string,
  privacyLevel = 0,
  groupId?: string
): Promise<Link> => {
  try {
    return await (
      await fetch(`${process.env.FRONTEND_URL}/api/link/add`, {
        method: 'POST',
        body: JSON.stringify({
          link,
          description,
          privacyLevel,
          groupId,
        }),
      })
    ).json();
  } catch (error) {
    console.log('E ' + error);
  }
};

export const removeLink = async (id: string) => {
  try {
    return await fetch(`${process.env.FRONTEND_URL}/api/link/del`, {
      method: 'POST',
      body: JSON.stringify({
        id,
      }),
    });
  } catch (error) {
    console.log('E ' + error);
  }
};
