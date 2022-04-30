import React from 'react'
import SignIn from '../SignIn'
import styles from './SignInContainer.module.css'

const SignInContainer = () => {
    return (
        <div className={styles.signInContainer}>
            <SignIn />
        </div>
    )
}

export default SignInContainer
