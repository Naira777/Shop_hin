import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { productDetailsReducer, productListReducer, cartReducer, productSaveReducer, productDeleteReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer} from './reducers/productReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo= Cookie.getJSON("userInfo") || null ;


const initialState = { cart: {cartItems, shipping: {}, payment: {} }, userSignin: {userInfo } };
const reducer = combineReducers({

    productList: productListReducer,
    productDetails: productDetailsReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    cart: cartReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;