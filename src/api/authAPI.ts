import {APIResponseType, instance, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";

type AuthMeResponseType = {
    id: number
    email: string
    login: string
};

type LoginResponseType = {
    userId: number
};

type CaptchaUrlResponseType = {
    url: string
};

export const authAPI = {
    authMe: () => {
        return instance.get<APIResponseType<AuthMeResponseType>>(`/auth/me`).then(res => res.data);
    },
    login: (email: string | null, password: string, rememberMe: boolean = false, captcha: null | string = null) => {
        return instance.post<APIResponseType<LoginResponseType, ResultCodeEnum | ResultCodeForCaptchaEnum>>
        (`/auth/login`, {email, password, rememberMe, captcha}).then(res => res.data);
    },
    logout: () => {
        return instance.delete<APIResponseType>(`/auth/login`).then(res => res.data);
    },
    getCaptcha: () => {
        return instance.delete<CaptchaUrlResponseType>(`/security/get-captcha-url`).then(res => res.data);
    },
}