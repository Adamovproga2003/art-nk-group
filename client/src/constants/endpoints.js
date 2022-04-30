export const BASE_URLS = {
  TEST: "/test",
  AUTH: "/auth",
  SHIPPING: "/shipping",
  PRODUCTS: "/products"
};

export const AUTH_ENDPOINT = {
  LOGIN: `${BASE_URLS.AUTH}/login`,
  SIGN_UP: `${BASE_URLS.AUTH}/sign-up`,
  ACCOUNT_ACTIVATE: `${BASE_URLS.AUTH}/account-activate`,
  GET_DATA: `${BASE_URLS.AUTH}/profile`,
};

export const TEST_ENDPOINTS = {
  CONNECT_WITH_DB: `${BASE_URLS.TEST}/connect-test`,
};

export const PRODUCT_ENDPOINTS = {
  GET_PRODUCT: `${BASE_URLS.PRODUCTS}/get-product/`,
  GET_CATEGORIES: `${BASE_URLS.PRODUCTS}/get-categories`,
  GET_PRODUCTS: `${BASE_URLS.PRODUCTS}/get-products`
}

export const SHIPPING_ENDPOINTS = {
  VALIDATE_ADDRESS: `${BASE_URLS.SHIPPING}/validate-address`,
  VIREFY_NUMBER: `${BASE_URLS.SHIPPING}/virefy-number`,
  VERIFY_CODE: `${BASE_URLS.SHIPPING}/verify-code`,
};
