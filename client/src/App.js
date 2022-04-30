import { useEffect } from 'react'
import { showErrors, showSuccess, showWarn } from './helpers/alerts';
import { connect } from 'react-redux'
import { apiResetError, apiResetMessage, apiResetWarns } from './actions/api-actions'
import { test } from './actions/test-actions'
import { activeAuth, getData } from './actions/auth-actions'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router';
import { AUTH_ROUTES, PAGE_ROUTES } from './constants/routes';
import AppComponent from './components/containers/AppComponent';
import SignInContainer from './components/auth/SignIn/SignInContainer/SignInContainer';
import SignUpContainer from './components/auth/SignUp/SignUpContainer/SignUpContainer';
import { isJwtExpired } from 'jwt-check-expiration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ errors, warns, message, apiResetError, apiResetMessage, test, activeAuth, getData }) => {

    useEffect(() => {
        if (errors && errors.length > 0) {
            showErrors(errors, apiResetError);
        }
    }, [errors]);

    useEffect(() => {
        if (message) {
            showSuccess(message, apiResetMessage);
        }
    }, [message])

    useEffect(() => {
        if (warns && warns.length > 0) {
            showWarn(warns, apiResetWarns);
        }
    }, [warns])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            if (!isJwtExpired(token)) {
                activeAuth();
                getData(token)
            } else {
                console.error('TOKEN IS EXPIRED');
            }
        }
    }, [])

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path={AUTH_ROUTES.SIGN_IN} element={<SignInContainer />} />
                <Route path={AUTH_ROUTES.SIGN_UP} element={<SignUpContainer />} />
                <Route path={PAGE_ROUTES.HOME_PAGE_ROUTE} element={<AppComponent />} >
                    <Route path={PAGE_ROUTES.PRODUCT_PAGE_ROUTE} element={<AppComponent />} />
                    <Route path={PAGE_ROUTES.ABOUT_PAGE_ROUTE} element={<AppComponent />} />
                    <Route path={PAGE_ROUTES.CONTACT_PAGE_ROUTE} element={<AppComponent />} />
                    <Route path={AUTH_ROUTES.ACCOUNT_ACTIVATION} element={<AppComponent />} />
                </Route>
                {/* <Route path="*" element={<Navigate to={PAGE_ROUTES.HOME_PAGE_ROUTE} />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default connect(
    state => ({
        errors: state.api.errors,
        message: state.api.message,
        warns: state.api.warns,
    }),
    { apiResetError,apiResetWarns, apiResetMessage, test, activeAuth, getData }
)(App);
