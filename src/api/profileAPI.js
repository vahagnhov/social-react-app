import {APIBaseUrlInstance} from "./config";

export const profileAPI = {
    getProfile: (userId) => {
        return APIBaseUrlInstance.get(`/profile/${userId}`);
    },
    getStatus: (userId) => {
        return APIBaseUrlInstance.get(`/profile/status/${userId}`);
    },
    updateStatus: (status) => {
        return APIBaseUrlInstance.put(`/profile/status`, {status: status});
    }
}