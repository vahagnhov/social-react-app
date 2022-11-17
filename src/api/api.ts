import axios from "axios";

const API_KEY = 'ca94c9e8-e9a9-4f5f-b46b-81fb195f7b8b';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': API_KEY
    }
});

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
};