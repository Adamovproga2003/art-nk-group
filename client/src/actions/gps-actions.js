import { END_VALID, GET_GPS, GET_LOCALITY, START_VALID } from "../action-types";

export const getGpsUser = (lat, long) => {
  return {
    type: GET_GPS,
    payload: { lat, long },
  };
};

export const getLocalityUser = (city, state, country) => {
  return {
    type: GET_LOCALITY,
    payload: { city, state, country },
  };
};

export const startValid = () => {
  return {
    type: START_VALID
  }
}

export const endValid =() => {
  return {
    type: END_VALID
  }
}