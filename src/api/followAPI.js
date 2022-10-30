import {APIBaseUrlInstance} from "./config";

export const followAPI = {
    followUser: (userId) => {
        return APIBaseUrlInstance.post(`/follow/${userId}`);
    },
    unfollowUser:(userId) => {
        return APIBaseUrlInstance.delete(`/follow/${userId}`);
    }
}