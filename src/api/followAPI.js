import {APIBaseUrlInstance} from "./config";

export const followAPI = {
    followUser: (userId) => {
        return APIBaseUrlInstance.post(`/follow/${userId}`, {}, {})
            .then(response => response.data);
    },
    unfollowUser:(userId) => {
        return APIBaseUrlInstance.delete(`/follow/${userId}`, {}).then(response => response.data);
    }
}