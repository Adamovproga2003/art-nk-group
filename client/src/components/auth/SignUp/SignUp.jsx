import { Paper } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router'
import { SubmissionError } from 'redux-form'
import { disabledAuth, login, signUp } from '../../../actions/auth-actions'
import LogoComponent from '../../core/Header/LogoComponent/LogoComponent'
import SignUpForm from '../../form/auth/SignUpForm/SignUpForm'
import styles from './SignUp.module.css'


function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    const prev = ref.current;
    ref.current = value;
    if (prev !== undefined) {
        return prev;
    } else {
        return ref.current
    }

}

const SignUp = ({ disabledAuth, login, signUp, user }) => {

    const prevToken = usePrevious(localStorage.getItem('token'))
    const navigate = useNavigate();

    const onSubmit = values => {
        const { username, email, password, checkPassword } = values
        if (password === checkPassword) {
            signUp({ username, email, password })
        } else {
            throw new SubmissionError({
                checkPassword: 'Check password is not the same! Please rewrite your password!',
                _error: 'Login failed!'
            })
        }
    }

    useEffect(() => {
        disabledAuth()
    }, [])

    useEffect(() => {
        if (user) {
            login(user)
        }
    }, [user])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token !== prevToken) {
            navigate('/')
        }
    })

    return (
        <div className={styles.signUp}>
            <Paper elevation={6} className={styles.paperWrapper}>
                <div className={styles.labelForm}>
                    <div>
                        <LogoComponent />
                    </div>
                    <div>
                        <h2>Sign up to <i>art.group.nk</i></h2>
                    </div>
                </div>
                <SignUpForm onSubmit={onSubmit} />
            </Paper>
        </div>
    )
}

export default connect(
    state => ({
        user: state.auth.user
    }),
    { signUp, login, disabledAuth }
)(SignUp)
