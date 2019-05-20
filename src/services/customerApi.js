import axios from 'axios';
import { async } from 'q';
import { EROFS } from 'constants';

const HTTP_ENDPOINT = 'http://localhost:3000/api/';

export const getAllCustomers = async ({ limit, offset, keyword }) => {
  if (limit === undefined || offset === undefined) {
    throw new Error('limit or offset is missing');
  }

  if (
    typeof limit !== 'number' ||
    typeof offset !== 'number' ||
    (keyword && typeof keyword !== 'string')
  ) {
    throw new Error('input data type is invalid');
  }

  const result = await axios.post(HTTP_ENDPOINT + '/user/all', {
    limit,
    offset,
    keyword,
  });

  if (result.data) {
    return {
      customers: result.data.users,
      totalItems: result.data.totalUsers,
      STATUS: result.data.STATUS,
    };
  }

  throw new Error('API ERROR: ' + result.data.STATUS.message);
};

export const removeOneCustomer = async ({ userId }) => {
  if (!userId) {
    throw new Error('userId is missing');
  }

  if (typeof userId !== 'string') {
    throw new Error('input data type is invalid');
  }

  const result = await axios.post(HTTP_ENDPOINT + '/user/remove', {
    userId,
  });

  if (result.data) {
    return {
      STATUS: result.data.STATUS,
    };
  }

  throw new Error('API ERROR: ' + result.data.message);
};

