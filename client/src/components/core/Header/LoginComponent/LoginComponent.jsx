import React from 'react'
import { connect } from 'react-redux'
import styles from './LoginComponent.module.css'
import { Button } from '@mui/material';
import { AUTH_ROUTES } from '../../../../constants/routes';
import { logOut } from '../../../../actions/auth-actions';

const LoginComponent = ({ isAuth, logOut }) => {
    return (
        <div className={styles.loginComponent}>
            {!isAuth && <Button variant="contained" href={AUTH_ROUTES.SIGN_IN}>Log In</Button>}
            {isAuth &&
                <div className={styles.logOutComponent}>
                    <div><h4>You are authorized!</h4></div>
                    <div><Button variant="contained" onClick={logOut}>Log out</Button></div>
                </div>
            }
        </div>
    )
}

export default connect(
    state => ({
        isAuth: state.auth.isAuth
    }),
    { logOut }
)(LoginComponent)
