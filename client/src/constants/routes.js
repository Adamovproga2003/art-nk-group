export const BASE_ROUTES = {
    TOKEN: ':token',
    PRODUCT_ID: ':id'
}

export const PAGE_ROUTES = {
    HOME_PAGE_ROUTE: '/',
    ABOUT_PAGE_ROUTE: '/about',
    CONTACT_PAGE_ROUTE: '/contact',
    PRODUCT_PAGE_ROUTE: `/product/${BASE_ROUTES.PRODUCT_ID}`,
}

export const AUTH_ROUTES = {
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    ACCOUNT_ACTIVATION: `/activate-account/${BASE_ROUTES.TOKEN}`
}