import React from 'react'
import Footer from '../core/Footer/Footer'
import Header from '../core/Header/Header'
import Main from '../core/Main/Main'
import ScrollToTop from '../utils/ScrollToTop'
import styles from './AppComponent.module.css'

const AppComponent = () => {

    return (
        <div className={styles.appComponent}>
            <ScrollToTop />
            <Header />
            <Main />
            <Footer />
        </div >
    )
}

export default AppComponent
