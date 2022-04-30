import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './ActivationContainer.module.css'
import { activateAccount } from './../../../actions/auth-actions'
import { useParams } from 'react-router'

const ActivationContainer = ({ activateAccount }) => {
    const { token } = useParams()

    useEffect(() => {
        activateAccount(token)
    }, [])

    return (
        <div className={styles.activationContainer}>
            Activation page
        </div>
    )
}

export default connect(
    null,
    { activateAccount }
)(ActivationContainer)
