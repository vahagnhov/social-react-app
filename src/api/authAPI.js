import {APIBaseUrlInstance} from "./config";

export const authAPI = {
    login: () => {
        return APIBaseUrlInstance.get( `/auth/me`, {})
            .then(response => response.data);
    }
}