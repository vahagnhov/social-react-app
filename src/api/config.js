import axios from "axios";

const API_KEY = 'ca94c9e8-e9a9-4f5f-b46b-81fb195f7b8b';

export const APIBaseUrlInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': API_KEY
    }
});