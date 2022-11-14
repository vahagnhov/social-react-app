import {APIBaseUrlInstance} from "./config";
import {ResultCodeEnum} from "../types/types";

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

type AuthMeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
};

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
};

type LogoutResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
};

type CaptchaUrlResponseType = {
    url: string
};

export const authAPI = {
    authMe: () => {
        return APIBaseUrlInstance.get<AuthMeResponseType>(`/auth/me`).then(res => res.data);
    },
    login: (email: string | null, password: string, rememberMe: boolean = false, captcha: null | string = null) => {
        return APIBaseUrlInstance.post<LoginResponseType>(`/auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logout: () => {
        return APIBaseUrlInstance.delete<LogoutResponseType>(`/auth/login`).then(res => res.data);
    },
    getCaptcha: () => {
        return APIBaseUrlInstance.delete<CaptchaUrlResponseType>(`/security/get-captcha-url`).then(res => res.data);
    },
}