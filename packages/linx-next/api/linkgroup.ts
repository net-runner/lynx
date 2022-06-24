import { LinkGroup } from '@prisma/client';

export const getGroups = async (
  limit: number,
  page = 0,
  skip = 0,
  privacyLevel = 0,
  username?: string
) => {
  try {
    return await (
      await fetch(
        `${
          process.env.FRONTEND_URL
        }/api/linkgroup/${limit}/${page}/${skip}/${privacyLevel}${
          username ? `/${username}` : ''
        }`
      )
    ).json();
  } catch (error) {
    console.log('E ' + error);
  }
};

export const incrementLinkedCount = async (groupId) => {
  try {
    await fetch(
      `${process.env.FRONTEND_URL}/api/linkgroup/incrementLinkedCount`,
      {
        method: 'POST',
        body: JSON.stringify({
          id: groupId,
        }),
      }
    );
  } catch (error) {
    console.log('E ' + error);
  }
};

export const createGroup = async (data) => {
  try {
    const newGroup: LinkGroup = await fetch(
      `${process.env.FRONTEND_URL}/api/linkgroup/add`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    ).then((res) => res.json());
    return newGroup;
  } catch (error) {
    console.log('E ' + error);
    return false;
  }
};
