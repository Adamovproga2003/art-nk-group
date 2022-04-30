import React from 'react'
import { NavLink } from 'react-router-dom'
import { PAGE_ROUTES } from '../../../../constants/routes'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={styles.navBar}>
            <ul>
                <li><NavLink to={PAGE_ROUTES.HOME_PAGE_ROUTE}>Home Page</NavLink></li>
                <li><NavLink to={PAGE_ROUTES.ABOUT_PAGE_ROUTE}>About us</NavLink></li>
                <li><NavLink to={PAGE_ROUTES.CONTACT_PAGE_ROUTE}>Contact us</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar
