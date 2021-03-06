import {
    AUTH_FAIL,
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT_PATH,
    AUTH_INITIATE_LOGOUT,
    AUTH_CHECK_TIMEOUT,
    AUTH_USER,
    AUTH_CHECK_STATE
} from "./types";

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
    return {
        type: AUTH_INITIATE_LOGOUT
    }
};

export const logoutSuccess = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: AUTH_CHECK_TIMEOUT,
        expirationTime
    }
};

export const auth = (email, password, isSignup) => {
    return {
        type: AUTH_USER,
        email,
        password,
        isSignup
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const authCheckState = () => {
    return {
        type: AUTH_CHECK_STATE
    }
};