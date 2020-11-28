/* eslint-disable prettier/prettier */
export const CREATED = 'CREATED';
export const initDB = 'initDB';
export const SETDATAFETCHED = 'SETDATAFETCHED';
export const GETPRODUCTS = 'GETPRODUCTS';
export const GETSTOREPRODUCTS = 'GETSTOREPRODUCTS';
export const NEWPRODUCT = 'NEWPRODUCT';
export const UPDATEPRODUCTS = 'UPDATEPRODUCTS';
export const DELETEPRODUCT = 'DELETEPRODUCT';
export const FETCH_DATA = 'FETCH_DATA';
export const UPDATEPRODUCT = 'UPDATEPRODUCT';
export const ADDINGPRODUCT = 'ADDINGPRODUCT';

export const update = (products) => ({
  type: UPDATEPRODUCTS,
  payload: {
    products: products.data,
  },
});

export const storeProducts = (products) => ({
  type: GETSTOREPRODUCTS,
  payload: {
    storeProducts: products.data,
  },
});
