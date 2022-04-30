import React from 'react'
import styles from './SignIn.module.css';
import { Paper } from '@mui/material';
import LogoComponent from '../../core/Header/LogoComponent/LogoComponent';
import SignInForm from '../../form/auth/SignInForm/SignInForm';
import { connect } from 'react-redux';
import { login } from '../../../actions/auth-actions'
import { Link } from 'react-router-dom';
import { AUTH_ROUTES } from '../../../constants/routes';
import { useNavigate } from 'react-router';


let SignIn = ({ login }) => {
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const answer = await login(values);
        if (answer) {
            navigate('/')
        }
    }

    return (
        <div className={styles.signIn}>
            <Paper elevation={6} className={styles.paperWrapper}>
                <div className={styles.labelForm}>
                    <div>
                        <LogoComponent />
                    </div>
                    <div>
                        <h2>Log in to <i>art.group.nk</i></h2>
                    </div>
                    <div>
                        <Link to={AUTH_ROUTES.SIGN_UP}>Don't authorized. Sign up.</Link>
                    </div>
                </div>
                <SignInForm onSubmit={onSubmit} />
            </Paper>
        </div>
    )
}

export default connect(
    null,
    { login }
)(SignIn);
