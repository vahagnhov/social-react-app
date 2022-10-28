import {APIBaseUrlInstance} from "./config";

export const profileAPI = {
    setUser: (userId) => {
        return APIBaseUrlInstance.get(`/profile/${userId}`)
            .then(response => response.data);
    }
}