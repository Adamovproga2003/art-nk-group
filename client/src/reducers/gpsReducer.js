import {
  CLEAR_VALIDATE,
  GET_GPS,
  GET_LOCALITY,
  SUCCESS_VALIDATE_ADDRESS,
} from "../action-types";

const initialState = {
  lat: null,
  long: null,
  address: null,
  city: null,
  country_code: null,
  postal_code: null,
  state: null,
  country: null,
  isValid: null,
  isStart: false
};

export const gpsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_GPS:
      return { ...state, lat: action.payload.lat, long: action.payload.long };
    case GET_LOCALITY:
      return {
        ...state,
        city: action.payload.city,
        state: action.payload.state,
        country: action.payload.country,
      };
    case SUCCESS_VALIDATE_ADDRESS:
      console.log(action);
      return {
        ...state,
        isValid: action.payload.data.isValid,
        address: action.payload.data.address,
        city: action.payload.data.city,
        country_code: action.payload.data.country_code,
        postal_code: action.payload.data.postal_code,
        state: action.payload.data.state
      };
    case CLEAR_VALIDATE:
      return { ...state, isValid: null };
    default:
      return state;
  }
};
