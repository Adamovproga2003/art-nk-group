import { ACTIVE_AUTH, DISABLE_AUTH, LOG_OUT, SUCCESS_AUTH, SUCCESS_AUTHORIZED, SUCCESS_GET_DATA } from "../action-types"

const initialState = {
    user: null,
    isAuth: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_AUTHORIZED:
            return { ...state, isAuth: true, user: action.payload }
        case DISABLE_AUTH:
            return { ...state, isAuth: false }
        case ACTIVE_AUTH:
            return { ...state, isAuth: true }
        case SUCCESS_GET_DATA:
            return { ...state, user: action.payload.user }
        case LOG_OUT:
            return { ...state, user: null, isAuth: false }
        case SUCCESS_AUTH:
            return { ...state, user: action.payload, isAuth: true }
        default:
            return state
    }
}