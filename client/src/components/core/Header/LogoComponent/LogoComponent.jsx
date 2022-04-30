import React from 'react'
import styles from './LogoComponent.module.css'
import logo from './../../../../assets/logo_example.png'
import { Link } from 'react-router-dom'
import { PAGE_ROUTES } from '../../../../constants/routes'

const LogoComponent = () => {
    return (
        <div className={styles.logoComponent}>
            <Link to={PAGE_ROUTES.HOME_PAGE_ROUTE}><img src={logo} alt='Logo of the group' /></Link>
        </div>
    )
}

export default LogoComponent
