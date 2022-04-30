import { FAILURE_REQUEST_VERIFY, FAILURE_VERIFY_CODE, SUCCESS_VERIFY_CODE } from "../action-types";

const initialState = {
  isConfirmedPhone: null,
};

export const shippingReducer = (state = initialState, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-sequences
    case SUCCESS_VERIFY_CODE, FAILURE_VERIFY_CODE, FAILURE_REQUEST_VERIFY:
      return { ...state, isConfirmedPhone: action.payload }
    default:
      return state;
  }
};
