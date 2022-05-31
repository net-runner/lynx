import axios from 'axios';

const { FRONTEND_URL } = process.env;
export const getgroup = async ({ page, limit }) => {
  try {
    const res = await axios.get(
      `${FRONTEND_URL}/api/linkgroup/${limit}/${page}`
    );
    console.log(res.data);
    return res;
  } catch (error) {
    console.log('E ' + error);
  }
};
