import {authAPI} from "../../api/authAPI";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../../api/api";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
};

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'AUTH_SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'AUTH_SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        default:
            return state;
    }
};

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null,
                      login: string | null, isAuth: boolean, captchaUrl: string | null) => ({
        type: 'AUTH_SET_USER_DATA',
        payload: {userId, email, login, isAuth, captchaUrl}
    } as const),
    setCaptcha: (captchaUrl: string) => ({
        type: 'AUTH_SET_CAPTCHA_URL',
        captchaUrl
    } as const),

}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let myResponse = await authAPI.authMe();
    if (myResponse && myResponse.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = myResponse.data;
        dispatch(actions.setAuthUserData(id, email, login, true, null));
    }
}

export const login = (email: string | null, password: string, rememberMe: boolean, captcha: string | null)
    : ThunkType => async (dispatch) => {
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
        dispatch(actions.setAuthUserData(null, null, null, false, null));
    }
}

export const getCaptchaUrl: ThunkType = async (dispatch) => {
    let captchaUrlResponse = await authAPI.getCaptcha();
    let captchaUrl = captchaUrlResponse.url;
    dispatch(actions.setCaptcha(captchaUrl));
}

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export default authReducer;