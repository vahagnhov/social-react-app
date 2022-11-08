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
    },
    updatePhoto: (photoFile) => {
        const formData = new FormData();
        formData.append('image', photoFile);
        return APIBaseUrlInstance.put(`/profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    },
    updateProfile: (profile) => {
        return APIBaseUrlInstance.put(`/profile`, profile);
    }
}