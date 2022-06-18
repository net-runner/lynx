export const addLink = async (
  link: string,
  description: string,
  privacyLevel = 0,
  groupId?: string
) => {
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
