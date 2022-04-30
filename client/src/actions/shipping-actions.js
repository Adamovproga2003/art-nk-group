import {
  FAILURE_REQUEST_VERIFY,
  FAILURE_VERIFY_CODE,
  SUCCESS_VALIDATE_ADDRESS,
  SUCCESS_VERIFY_CODE,
  SUCCESS_VERIFY_NUMBER,
} from "../action-types";
import { SHIPPING_ENDPOINTS } from "../constants/endpoints";
import { apiAction } from "./api-actions";

export const validateAddress = (data) => {
  return apiAction(
    SHIPPING_ENDPOINTS.VALIDATE_ADDRESS,
    "POST",
    data,
    (data) => successValidateAddress(data),
    () => console.error("Something went wrong")
  );
};

const successValidateAddress = (data) => {
  console.log(data);
  return {
    type: SUCCESS_VALIDATE_ADDRESS,
    payload: data,
  };
};

export const verifyNumber = (dialCode, rawPhone) => {

  return apiAction(
    SHIPPING_ENDPOINTS.VIREFY_NUMBER,
    "POST",
    { dialCode, rawPhone },
    (data) => successRequestVerify(data),
    data => failureRequestVerify(data)
  );
};

const successRequestVerify = data => {
  return {
    type: SUCCESS_VERIFY_NUMBER,
    payload: data.isConfirmed,
  };
};

export const verifyCode = (code) => {
  return apiAction(
    SHIPPING_ENDPOINTS.VERIFY_CODE,
    "POST",
    { code },
    (data) => successVerifyCode(data),
    (data) => failureVerifyCode(data)
  );
};

const successVerifyCode = (data) => {
  return {
    type: SUCCESS_VERIFY_CODE,
    payload: data.isConfirmed,
  };
};


const failureVerifyCode = (data) => {
  return {
    type: FAILURE_VERIFY_CODE,
    payload: data.isConfirmed
  };
}

const failureRequestVerify = (data) => {
  return {
    type: FAILURE_REQUEST_VERIFY,
    payload: data.isConfirmed
  };
}