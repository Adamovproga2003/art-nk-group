import { TEST_ENDPOINTS } from "../constants/endpoints"
import { apiAction } from "./api-actions"

export const test = () => {
    return apiAction(
        TEST_ENDPOINTS.CONNECT_WITH_DB,
        'GET',
        null,
        () => {
            console.log('Connected')
        },
        () => {
            console.log('You have some errors with connect! Please to try repair this!')
        }
    )
}

