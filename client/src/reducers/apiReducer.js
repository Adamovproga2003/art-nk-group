import { API_ERROR, API_FINISH, API_START, API_SUCCESS, API_WARN, RESET_ERROR, RESET_MESSAGE, RESET_WARN } from "../action-types"

const initialState = {
    message: null,
    errors: null,
    isLoading: false,
    warns: null
}

export const apiReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_SUCCESS:
            return { ...state, message: action.payload }
        case API_ERROR:
            return { ...state, errors: action.errors }
        case API_WARN:
            return { ...state, warns: action.warns }
        case API_START:
            return { ...state, isLoading: action.payload }
        case API_FINISH:
            return { ...state, isLoading: action.payload }
        case RESET_MESSAGE:
            return { ...state, message: null }
        case RESET_ERROR:
            return { ...state, errors: null }
        case RESET_WARN:
            return { ...state, warns: null }
        default:
            return state
    }
}