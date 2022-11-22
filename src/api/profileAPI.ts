import {PhotosType, ProfileType} from "../types/types";
import {instance, APIResponseType} from "./api";

type UpdatePhotoResponseType = {
    photos: PhotosType
};

export const profileAPI = {
    getProfile: (userId: number) => {
        return instance.get<ProfileType>(`/profile/${userId}`).then(res => res.data);
    },
    getStatus: (userId: number) => {
        return instance.get<any>(`/profile/status/${userId}`).then(res => res.data);
    },
    updateStatus: (status: string) => {
        return instance.put<APIResponseType>(`/profile/status`, {status: status})
            .then(res => res.data);
    },
    updatePhoto: (photoFile: any) => {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<APIResponseType<UpdatePhotoResponseType>>(`/profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => res.data);
    },
    updateProfile: (profile: ProfileType) => {
        return instance.put<APIResponseType>(`/profile`, profile).then(res => res.data);
    }
}