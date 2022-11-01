import {APIBaseUrlInstance} from "./config";

export const authAPI = {
    authMe: () => {
        return APIBaseUrlInstance.get(`/auth/me`);
    },
    login: (email, password, rememberMe, captcha) => {
        return APIBaseUrlInstance.post(`/auth/login`, {email, password, rememberMe, captcha});
    },
    logout: () => {
        return APIBaseUrlInstance.delete(`/auth/login`);
    },
    getCaptcha: () => {
        return APIBaseUrlInstance.delete(`/security/get-captcha-url`);
    },
}