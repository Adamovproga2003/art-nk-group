import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { apiReducer } from './reducers/apiReducer.js';
import { reducer as formReducer } from 'redux-form';
import { apiMiddleware } from './middleWares/apiMiddleware';
import { authReducer } from './reducers/authReducer.js';
import { appReducer } from './reducers/appReducer.js';
import { shippingReducer } from './reducers/shippingReducer.js';
import { gpsReducer } from './reducers/gpsReducer.js';

const rootReducer = combineReducers({
    api: apiReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    shipping: shippingReducer,
    gps: gpsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(apiMiddleware)));

export default store;