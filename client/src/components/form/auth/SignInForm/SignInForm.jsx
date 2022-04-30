import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './SignInForm.module.css'
import { LoadingButton } from '@mui/lab';
import { connect } from 'react-redux'

const validate = values => {
    const errors = {}
    if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address'
    }
    if (values.password && values.password.length < 8) {
        errors.password = 'Must be at least 8'
    }
    if (values.password && values.password.length > 20) {
        errors.password = 'Must be not more than 20'
    }
    if (values.password !== values.checkPassword) {
        errors.checkPassword = "Check-password don't compare with your password"
    }
    return errors
}


let SignInForm = (props) => {

    // To setting validatting
    const [showPassword, setShowPassword] = useState(false)
    const { isLoading, handleSubmit, pristine, submitting, invalid } = props

    const renderTextField = field => (
        <TextField
            floatinglabeltext={field.input.label}
            errortext={field.touched && field.error}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            label={field.label}
            {...field.input}
        />
    )

    return (
        <form onSubmit={handleSubmit} className={styles.signInForm}>
            <div className={styles.formElement}>
                <Field name="email" component={renderTextField} type="email"
                    placeholder={'Email'}
                    required={true}
                    label={'Email'} />
            </div>
            <div className={styles.formElement}>
                <Field name="password" component={renderTextField} type={showPassword ? 'text' : 'password'}
                    placeholder={'Password'}
                    required={true}
                    label={'Password'} />
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </div>
            <div className={styles.formElement}>
                <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    type='submit'
                    disabled={pristine || submitting || invalid}
                >
                    Sign In
                </LoadingButton>
            </div>
        </form>
    )
}

SignInForm = reduxForm({
    form: 'sign-in-form',
    validate
})(SignInForm)

export default connect(
    state => ({
        isLoading: state.api.isLoading
    })
)(SignInForm);
