import {authAPI} from "../../api/authAPI";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'AUTH_SET_USER_DATA';
const SET_CAPTCHA_URL = 'AUTH_SET_CAPTCHA_URL';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

export const authReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
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


type SetAuthUserDataPayloadActionType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: null | string;
};
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadActionType
};

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null)
    : SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth, captchaUrl}
});

export const getAuthUserData = () => async (dispatch: any) => {
    let response = await authAPI.authMe();
    if (response && response.data && response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true, null));
    }
}

export const login = (email: string | null, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: any) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response && response.data && response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error';
        dispatch(stopSubmit('login', {_error: errorMessage}));
        if (response && response.data && response.data.resultCode === 10) {
            dispatch(getCaptchaUrl);
        }
    }
}

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response && response.data && response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null));
    }
}

type SetCaptchaActionType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string
};
export const setCaptcha = (captchaUrl: string): SetCaptchaActionType => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
});

export const getCaptchaUrl = async (dispatch: any) => {
    let response = await authAPI.getCaptcha();
    let captchaUrl = response.data.url;
    dispatch(setCaptcha(captchaUrl));
}

export default authReducer;