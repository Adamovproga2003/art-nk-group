import { TEST_API } from "../action-types";

import axios from "axios";
import {
  apiError,
  apiStart,
  apiSuccess,
  apiFinish,
  apiWarn,
} from "../actions/api-actions";

export const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type !== TEST_API) return;
    const { data, method, onFailure, onSuccess, url, headers } = action.payload;
    const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true;

    dispatch(apiStart(true));
    return axios
      .request({
        url,
        method,
        headers,
        [dataOrParams]: data,
        data,
        withCredentials: true
      })
      .then((response) => {
        console.log("RESPONSE", response);
        if (response.data.message) {
          dispatch(apiSuccess(response.data.message));
        }
        if (onSuccess) {
          dispatch(onSuccess(response.data));
        }
        return true;
      })
      .catch((error) => {
        if (error.response.data.errors) {
          dispatch(apiError([{message: error.response.data.errors}]));
        }else{
          dispatch(apiWarn([{message: error.response.data.message}]));
        }

        if (onFailure) {
          dispatch(onFailure(error.response.data));
        }
        return false;
      })
      .finally(() => {
        dispatch(apiFinish(false));
      });
  };
