import {APIBaseUrlInstance} from "./config";

export const authAPI = {
    authMe: () => {
        return APIBaseUrlInstance.get( `/auth/me`, {})
            .then(response => response.data);
    }
}