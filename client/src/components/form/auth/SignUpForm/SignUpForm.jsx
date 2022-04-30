import { Fade, TextField } from '@mui/material'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styles from './SignUpForm.module.css'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import DoNotDisturbAltRoundedIcon from '@mui/icons-material/DoNotDisturbAltRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import Tooltip from '@mui/material/Tooltip';
import { LoadingButton } from '@mui/lab';
import { connect } from 'react-redux';

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

let SignUpForm = (props) => {

    // To setting validatting
    const { isLoading, handleSubmit, pristine, submitting, invalid } = props

    const renderTextField = field => {
        return <div>
            <TextField
                floatinglabeltext={field.input.label}
                errortext={field.meta.error}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                label={field.label}
                {...field.input}
            />
            {field.meta.error
                ?
                <Tooltip
                    TransitionComponent={Fade}
                    title={field.meta.error}
                    TransitionProps={{ timeout: 600 }}
                >
                    <span className={styles.validateDiv}>{!field.meta.pristine ? field.meta.error ? <DoNotDisturbAltRoundedIcon className={styles.error} /> : <CheckCircleRoundedIcon className={styles.success} /> : field.input.name !== 'checkPassword' ? <CircleRoundedIcon className={styles.noFilled} /> : null}</span>
                </Tooltip>
                :
                <span className={styles.validateDiv}>{!field.meta.pristine ? field.meta.error ? <DoNotDisturbAltRoundedIcon className={styles.error} /> : <CheckCircleRoundedIcon className={styles.success} /> : field.input.name !== 'checkPassword' ? <CircleRoundedIcon className={styles.noFilled} /> : null}</span>
            }

        </div>
    }

    return (
        <form onSubmit={handleSubmit} className={styles.signUpForm}>
            {/* <div className={styles.formElement}>
                <Field name="username" component={renderTextField} type="name"
                    placeholder={'Username'}
                    required={true}
                    label={'Username'} />
            </div> */}
            <div className={styles.formElement}>
                <Field name="email" component={renderTextField} type="email"
                    placeholder='Email'
                    required={true}
                    label='Email'
                />
            </div>
            <div className={styles.formElement}>
                <Field name="password" component={renderTextField} type='password'
                    placeholder='Password'
                    required={true}
                    label='Password'
                />
            </div>
            <div className={styles.formElement}>
                <Field name="checkPassword" component={renderTextField} type='password'
                    placeholder='Rewrite password'
                    required={true}
                    label='Check password'
                />
            </div>
            <div className={styles.formElement}>
                <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    type="submit"
                    disabled={pristine || submitting || invalid}
                >
                    Sign Up
                </LoadingButton>
            </div>
        </form>
    )
}

SignUpForm = reduxForm({
    form: 'sign-in-form',
    validate
})(SignUpForm)

export default connect(
    state => ({
        isLoading: state.api.isLoading
    })
)(SignUpForm);
