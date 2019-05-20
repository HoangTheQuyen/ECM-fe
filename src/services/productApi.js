import axios from 'axios';
import { async } from 'q';

const HTTP_ENDPOINT = 'http://localhost:3000/api/';

export const getAllProducts = async ({ limit, offset, keyword }) => {
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

  const result = await axios.post(HTTP_ENDPOINT + '/product/all', {
    limit,
    offset,
    keyword,
  });

  if (result.data) {
    return {
      products: result.data.products,
      totalItems: result.data.totalItems,
      STATUS: result.data.STATUS,
    };
  }
  throw new Error('API ERROR: ' + result.data.STATUS.returnMessage);
};

export const addOneProduct = async ({
  name,
  images,
  description,
  quantity,
  price,
  packageInfo,
  supplierId,
  categoryId,
  shopId,
}) => {
  if (
    !name ||
    !images ||
    !quantity ||
    !price ||
    !packageInfo ||
    !packageInfo.packageHeight ||
    !packageInfo.packageLength ||
    !packageInfo.packageWidth ||
    !packageInfo.packageWeight ||
    !packageInfo.packageContent
  ) {
    throw new Error('Data is missing');
  }

  if (
    typeof name !== 'string' ||
    typeof images !== 'object' ||
    typeof quantity !== 'number' ||
    typeof price !== 'number' ||
    (description && typeof description !== 'string') ||
    typeof packageInfo !== 'object' ||
    typeof packageInfo.packageHeight !== 'number' ||
    typeof packageInfo.packageLength !== 'number' ||
    typeof packageInfo.packageWidth !== 'number' ||
    typeof packageInfo.packageWeight !== 'number' ||
    typeof packageInfo.packageContent !== 'string' ||
    (supplierId && -typeof supplierId !== 'string') ||
    (categoryId && typeof categoryId !== 'string') ||
    (shopId && typeof shopId !== 'string')
  ) {
    throw new Error('Data type invalid');
  }

  const result = await axios.post(HTTP_ENDPOINT + '/user/create', {
    name: name,
    images: images,
    description: description,
    quantity: quantity,
    price: price,
    packageInfo: packageInfo,
    supplierId: supplierId,
    categoryId: categoryId,
    shopId: shopId,
  });

  if (result.data) {
    return {
      STATUS: result.data.STATUS,
      productId: result.data.productId,
    };
  }

  throw new Error('API ERROR: ' + result.data.STATUS.returnMessage);
};
