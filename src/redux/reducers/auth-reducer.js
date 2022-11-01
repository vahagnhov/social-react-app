import {authAPI} from "../../api/authAPI";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: false,
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.authMe().then(response => {
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthUserData(id, email, login, true));
            }
        });
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe, captcha).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            }else{
                let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error';
                dispatch(stopSubmit('login', {_error: errorMessage}));
                if(response.data.resultCode === 10){
                    getCaptchaUrl(dispatch);
                }
            }
        });
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
    }
}

export const setCaptcha = (captchaUrl) => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
});

export const getCaptchaUrl = (dispatch) => {
    authAPI.getCaptcha().then(response => {
        let captchaUrl = response.data.url;
        dispatch(setCaptcha(captchaUrl));
    });
}

export default authReducer;