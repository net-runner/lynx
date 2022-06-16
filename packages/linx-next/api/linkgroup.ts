export const getGroups = async (limit, page = 0, skip = 0) => {
  try {
    return await (
      await fetch(
        `${process.env.FRONTEND_URL}/api/linkgroup/${limit}/${page}/${skip}`
      )
    ).json();
  } catch (error) {
    console.log('E ' + error);
  }
};
