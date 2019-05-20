import axios from 'axios';
import { async } from 'q';

const HTTP_ENDPOINT = 'http://localhost:3000/api/';

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('email or password is missing');
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Data type is invalid');
  }

  const result = await axios.post(HTTP_ENDPOINT + '/auth/login', {
    email,
    password,
  });

  if (result.data.STATUS.returnCode === 1) {
    return {
      status: 'ok',

      currentAuthority: 'admin',
      // STATUS: result.data.STATUS,
      // accessToken: result.data.token,
    };
  } else {
    return {
      status: 'error',
      type: 'account',
      currentAuthority: 'guest',
    };
  }
};

export const register = async ({ name, email, password, image, phone }) => {
  if (!name || !email || !password || !image || !phone) {
    throw new Error('Datas field are missing');
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof image !== 'string' ||
    typeof phone !== 'string'
  ) {
    throw new Error('Data type is invalid');
  }

  const result = await axios.post(HTTP_ENDPOINT + '/auth/register', {
    name,
    email,
    password,
    image,
    phone,
  });

  if (result.data) {
  }
};
