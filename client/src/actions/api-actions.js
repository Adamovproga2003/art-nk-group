import { API_ERROR, API_FINISH, API_START, API_SUCCESS, TEST_API, RESET_MESSAGE, RESET_ERROR, RESET_WARN, API_WARN } from "../action-types";

export const apiAction = (
    url,
    method,
    data = null,
    onSuccess = null,
    onFailure = null,
    headers = null
) => {
    return {
        type: TEST_API,
        payload: {
            url,
            method,
            data,
            onSuccess,
            onFailure,
            headers
        }
    };
};

export const apiStart = data => {
    return { type: API_START, payload: data }
}

export const apiFinish = data => ({ type: API_FINISH, payload: data })

export const apiSuccess = message => ({ type: API_SUCCESS, payload: message })

export const apiError = errors => ({ type: API_ERROR, errors })
export const apiWarn = warns => ({type: API_WARN, warns})

export const apiResetMessage = () => ({ type: RESET_MESSAGE })
export const apiResetError = () => ({ type: RESET_ERROR })
export const apiResetWarns = () => ({type: RESET_WARN})