import { getAllProducts, addOneProduct } from '@/services/productApi';
import { message } from 'antd';

export default {
  namespace: 'product',

  state: {
    products: [],
    addProductSTATUS: {},
  },

  effects: {
    // fetchAll Customers
    *fetchAllProducts({ payload, callback }, { call, put }) {
      const { limit, offset, keyword } = payload;

      try {
        const response = yield call(getAllProducts, { limit, offset, keyword });

        yield put({
          type: 'gotAllProducts',
          payload: response,
        });
      } catch (err) {
        console.log(err);
      }
      callback();
    },

    *fetchAddOneProduct({ payload, callback }, { call, put }) {
      const {
        name,
        images,
        description,
        quantity,
        price,
        packageInfo,
        supplierId,
        categoryId,
        shopId,
      } = payload;

      try {
        const response = yield call(addOneProduct, {
          name,
          images,
          description,
          quantity,
          price,
          packageInfo,
          supplierId,
          categoryId,
          shopId,
        });

        yield put({
          type: 'gotAddOneProduct',
          payload: response,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    gotAllProducts(state, { payload }) {
      return {
        ...state,
        products: [...payload.products],
      };
    },
    gotAddOneProduct(state, { payload }) {
      return {
        ...state,
        removeCustomerSTATUS: payload.STATUS,
      };
    },
  },
};
