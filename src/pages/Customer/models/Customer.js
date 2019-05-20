import { getAllCustomers, removeOneCustomer } from '@/services/customerApi';
import { message } from 'antd';

export default {
  namespace: 'customer',

  state: {
    customers: [],
    removeCustomerSTATUS: {},
  },

  effects: {
    // fetchAll Customers
    *fetchAllCustomers({ payload, callback }, { call, put }) {
      const { limit, offset, keyword } = payload;

      try {
        const response = yield call(getAllCustomers, { limit, offset, keyword });

        yield put({
          type: 'gotAllCustomers',
          payload: response,
        });
      } catch (err) {
        console.log(err);
      }
      callback();
    },
    // remove one Customer
    *fetchRemoveOneCustomer({ payload, callback }, { call, put }) {
      const { userId } = payload;

      try {
        const response = yield call(removeOneCustomer, { userId });

        yield put({
          type: 'gotRemoveOneCustomer',
          payload: response,
        });
        const { STATUS } = response;
        if (STATUS.returnCode === 1) {
          message.success(STATUS.message);
        } else {
          message.error(STATUS.message);
        }

        if (STATUS.returnCode === 1 && callback) callback();
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    gotAllCustomers(state, { payload }) {
      return {
        ...state,
        customers: [...payload.customers],
      };
    },

    gotRemoveOneCustomer(state, { payload }) {
      return {
        ...state,
        removeCustomerSTATUS: payload.STATUS,
      };
    },
  },
};
