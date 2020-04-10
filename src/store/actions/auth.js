import {AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH} from "./types";
import axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId
    }
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error
    }
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000);
    }
};

export const auth = (email, password, isSignup) => dispatch => {
    dispatch(authStart());
    const authData = {
        email,
        password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDuS7cacqk26JsXnFG0bXMH1pQoiIyt5Q';
    if (!isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDuS7cacqk26JsXnFG0bXMH1pQoiIyt5Q';
    }
    axios.post(url, authData)
        .then((res) => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        }).catch(err => {
            console.log(err.response.data.error.message);
            dispatch(authFail(err.response.data.error))
    })
};

export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logOut());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logOut())
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
};