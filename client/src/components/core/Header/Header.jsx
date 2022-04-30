import React from 'react'
import styles from './Header.module.css'
import LoginComponent from './LoginComponent/LoginComponent'
import LogoComponent from './LogoComponent/LogoComponent'
import Navbar from './Navbar/Navbar'


const Header = () => {
    return (
        <header className={styles.header}>
            <LogoComponent />
            <Navbar />
            <LoginComponent />
        </header>
    )
}

export default Header
