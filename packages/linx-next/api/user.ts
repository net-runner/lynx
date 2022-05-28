import axios from 'axios';

export const signIn = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `/api/auth/signin`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    console.log(res.data);
    return res;
  } catch (error) {
    console.log('E ' + error);
  }
};

export const doLogout = async () => {
  try {
    await axios
      .get(`${process.env.FRONTEND_URL}/api/auth/logout`, {
        withCredentials: true,
      })
      .then((r) => r.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const user = await axios
      .get(`/api/auth/me`, { withCredentials: true })
      .then((r) => r.data);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.get(`/api/auth/logout`, { withCredentials: true });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async ({ email, password, name }) => {
  try {
    const res = await axios.post(`api/auth/signup`, {
      email,
      password,
      name,
    });
  } catch (error) {
    console.log(error);
  }
};
