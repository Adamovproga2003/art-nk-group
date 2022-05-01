import React from 'react'
import { Route, Routes } from 'react-router'
import { AUTH_ROUTES, PAGE_ROUTES } from '../../../constants/routes'
import ActivationContainer from '../../auth/ActivationContainer/ActivationContainer'
import AboutPage from './AboutPage/AboutPage'
import ContactPage from './ContactPage/ContactPage'
import HomePage from './HomePage/HomePage'
import styles from './Main.module.css'
import ProductPage from './ProductPage/ProductPage'

const Main = () => {
    
    return (
        <main className={styles.main}>
            <Routes>
                <Route exact path={PAGE_ROUTES.HOME_PAGE_ROUTE} element={<HomePage />} />
                <Route exact path={PAGE_ROUTES.ABOUT_PAGE_ROUTE} element={<AboutPage />} />
                <Route exact path={PAGE_ROUTES.PRODUCT_PAGE_ROUTE} element={<ProductPage />} />
                <Route exact path={PAGE_ROUTES.CONTACT_PAGE_ROUTE} element={<ContactPage />} />
                <Route exact path={AUTH_ROUTES.ACCOUNT_ACTIVATION} element={<ActivationContainer />} />
            </Routes>
        </main>
    )
}

export default Main;
