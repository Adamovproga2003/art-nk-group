import { ACTIVE_AUTH, DISABLE_AUTH, ERROR_ACTIVATED, ERROR_AUTH, ERROR_AUTHORIZED, ERROR_GET_DATA, LOG_OUT, SUCCESS_ACTIVATED, SUCCESS_AUTH, SUCCESS_AUTHORIZED, SUCCESS_GET_DATA } from "../action-types"
import { AUTH_ENDPOINT } from "../constants/endpoints"
import { apiAction } from "./api-actions"

export const login = (user) => {
    return apiAction(
        AUTH_ENDPOINT.LOGIN,
        'POST',
        { email: user.email, password: user.password },
        data => {
            console.log("Token", data.token)
            localStorage.setItem('token', data.token)
            console.log(data)
            return {
                type: SUCCESS_AUTH,
                payload: data.user
            }
        },
        () => {
            return {
                type: ERROR_AUTH
            }
        }
    )
}

export const signUp = data => {
    return apiAction(
        AUTH_ENDPOINT.SIGN_UP,
        'POST',
        data,
        ({ message, user, token }) => {
            localStorage.setItem('token', token)
            return {
                type: SUCCESS_AUTHORIZED,
                payload: user
            }
        },
        () => ({ type: ERROR_AUTHORIZED }),
    )
}

export const activateAccount = token => {
    return apiAction(
        AUTH_ENDPOINT.ACCOUNT_ACTIVATE,
        'POST',
        { token },
        successActivate,
        () => ({ type: ERROR_ACTIVATED }),
    )
}

const successActivate = user => {
    return {
        type: SUCCESS_ACTIVATED,
        user
    }
}

export const disabledAuth = () => {
    return {
        type: DISABLE_AUTH
    }
}

export const activeAuth = () => {
    return {
        type: ACTIVE_AUTH
    }
}

export const getData = token => {
    return apiAction(
        AUTH_ENDPOINT.GET_DATA,
        'POST',
        null,
        successGetData,
        errorGetData,
        { "Authorization": 'Bearer ' + token }
    )
}

const successGetData = data => {
    return {
        type: SUCCESS_GET_DATA,
        payload: data
    }
}

const errorGetData = () => {
    return {
        type: ERROR_GET_DATA
    }
}

export const logOut = () => {
    localStorage.removeItem('token')
    return {
        type: LOG_OUT
    }
}