/* eslint-disable prettier/prettier */
import {UPDATEPRODUCTS, GETPRODUCTS, ADDINGPRODUCT} from './actions';
import {initialStoreProducts, initialCategories} from './common';

const initialState = {
  fetchingData: false,
  addingProduct: false,
  myProducts: [],
  storeProducts: initialStoreProducts,
  categories: initialCategories,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATEPRODUCTS:
      return {
        ...state,
        myProducts: action.payload.products,
        fetchingData: false,
      };
    case GETPRODUCTS:
      return {...state, fetchingData: true};
    case ADDINGPRODUCT:
      return {...state, addingProduct: action.value};
    default:
      return state;
  }
};

export default reducer;
