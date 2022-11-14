import {authAPI, ResultCodeForCaptchaEnum} from "../../api/authAPI";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";
import {ResultCodeEnum} from "../../types/types";

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

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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

type ActionsTypes = SetAuthUserDataActionType | SetCaptchaActionType;

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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let myResponse = await authAPI.authMe();
    if (myResponse && myResponse.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = myResponse.data;
        dispatch(setAuthUserData(id, email, login, true, null));
    }
}

export const login = (email: string | null, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: any) => {
    let loginResponse = await authAPI.login(email, password, rememberMe, captcha);
    if (loginResponse && loginResponse.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        let errorMessage = loginResponse.messages.length > 0 ? loginResponse.messages[0] : 'Some Error';
        dispatch(stopSubmit('login', {_error: errorMessage}));
        if (loginResponse && loginResponse.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl);
        }
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    let logoutResponse = await authAPI.logout();
    if (logoutResponse && logoutResponse.resultCode === ResultCodeEnum.Success) {
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

export const getCaptchaUrl: ThunkType = async (dispatch) => {
    let captchaUrlResponse = await authAPI.getCaptcha();
    let captchaUrl = captchaUrlResponse.url;
    dispatch(setCaptcha(captchaUrl));
}

export default authReducer;