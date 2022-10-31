import {APIBaseUrlInstance} from "./config";

export const authAPI = {
    authMe: () => {
        return APIBaseUrlInstance.get(`/auth/me`);
    },
    login: (email, password, rememberMe) => {
        return APIBaseUrlInstance.post(`/auth/login`, {email, password, rememberMe});
    },
    logout: () => {
        return APIBaseUrlInstance.delete(`/auth/login`);
    },
}