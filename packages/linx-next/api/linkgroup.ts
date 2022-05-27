import axios from 'axios';

export const getgroup = async ({ page, limit }) => {
  try {
    const res = await axios.get(`/api/linkgroup/${limit}/${page}`);
    console.log(res.data);
    return res;
  } catch (error) {
    console.log('E ' + error);
  }
};
