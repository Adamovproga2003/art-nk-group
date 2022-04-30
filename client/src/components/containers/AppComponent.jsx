import React from 'react'
import Footer from '../core/Footer/Footer'
import Header from '../core/Header/Header'
import Main from '../core/Main/Main'
import styles from './AppComponent.module.css'

const AppComponent = () => {

    return (
        <div className={styles.appComponent}>
            <Header />
            <Main />
            <Footer />
        </div >
    )
}

export default AppComponent
