import {
  CLEAR_PRODUCT,
  FAIL_GET_CATEGORY,
  FAIL_GET_PRODUCT,
  FAIL_GET_PRODUCTS,
  GET_CATEGORY,
  GET_PRODUCT,
  GET_PRODUCTS,
} from "../action-types";
import { PRODUCT_ENDPOINTS } from "../constants/endpoints";
import { apiAction } from "./api-actions";

export const getProduct = (id) => {
  return apiAction(
    PRODUCT_ENDPOINTS.GET_PRODUCT + id,
    "GET",
    null,
    successGetProduct,
    failureGetProduct
  );
};

const successGetProduct = (data) => {
  console.log("SUCCESS GET PRODUCT INFO");
  return {
    type: GET_PRODUCT,
    payload: data,
  };
};

const failureGetProduct = () => {
  return {
    type: FAIL_GET_PRODUCT,
  };
};

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
  };
};

export const getCategories = () => {
  return apiAction(
    PRODUCT_ENDPOINTS.GET_CATEGORIES,
    "GET",
    null,
    successGetCategories,
    failureGetCategories
  );
};

const successGetCategories = (data) => {
  return {
    type: GET_CATEGORY,
    payload: data,
  };
};

const failureGetCategories = () => {
  return {
    type: FAIL_GET_CATEGORY,
  };
};

export const getProducts = () => {
  return apiAction(
    PRODUCT_ENDPOINTS.GET_PRODUCTS,
    "GET",
    null,
    successGetProducts,
    failureGetProducts
  );
};

const successGetProducts = (data) => {
  return {
    type: GET_PRODUCTS,
    payload: data,
  };
};

const failureGetProducts = () => {
  return {
    type: FAIL_GET_PRODUCTS,
  };
};
