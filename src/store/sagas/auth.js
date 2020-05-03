import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import {
    authFail,
    authStart,
    authSuccess,
    checkAuthTimeout,
    logOut,
    logoutSuccess
} from "../actions/auth";
import axios from "axios";

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token')
    yield call([localStorage, 'removeItem'], 'expirationDate')
    yield call([localStorage, 'removeItem'], 'userId')
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    yield put(logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logOut());
}

export function* authSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDuS7cacqk26JsXnFG0bXMH1pQoiIyt5Q';
    if (!action.isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDuS7cacqk26JsXnFG0bXMH1pQoiIyt5Q';
    }
    try {
        const response = yield axios.post(url, authData)

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkAuthTimeout(response.data.expiresIn));
    }catch(err) {
        yield authFail(err.response.data.error);
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if(!token) {
        yield put(logOut());
    }else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if(expirationDate <= new Date()) {
            yield put(logOut())
        }else {
            const userId = yield localStorage.getItem('userId');
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }
    }
}