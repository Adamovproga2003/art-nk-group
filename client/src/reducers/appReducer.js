import {
  CLEAR_PRODUCT,
  GET_CATEGORY,
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_OF_CATEGORY,
} from "../action-types";

const initialState = {
  products: [],
  categories: [],
  currentProduct: null,
  totalProducts: 0,
  limit: 10,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      console.log("PAYLOAD INFO");
      console.log(action.payload);
      return { ...state, currentProduct: action.payload };
    case CLEAR_PRODUCT:
      return { ...state, currentProduct: null };
    case GET_CATEGORY:
      return { ...state, categories: action.payload };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        totalProducts: action.payload.total,
        limit: action.payload.limit,
      };
    case GET_PRODUCTS_OF_CATEGORY:
      return {
        ...state,
        products: action.payload.products,
        totalProducts: action.payload.total,
        limit: action.payload.limit,
      };
    default:
      return state;
  }
};
