import {APIBaseUrlInstance} from "./config";

export const profileAPI = {
    getProfile: (userId) => {
        return APIBaseUrlInstance.get(`/profile/${userId}`)
            .then(response => response.data);
    }
}