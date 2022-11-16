import {APIBaseUrlInstance} from "./config";
import {PhotosType, ProfileType, ResultCodeEnum} from "../types/types";

type UpdateStatusResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
};

type ProfileResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
};

type UpdatePhotoResponseType = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
};

export const profileAPI = {
    getProfile: (userId: number) => {
        return APIBaseUrlInstance.get<ProfileType>(`/profile/${userId}`).then(res => res.data);
    },
    getStatus: (userId: number) => {
        return APIBaseUrlInstance.get<any>(`/profile/status/${userId}`).then(res => res.data);
    },
    updateStatus: (status: string) => {
        return APIBaseUrlInstance.put<UpdateStatusResponseType>(`/profile/status`, {status: status})
            .then(res => res.data);
    },
    updatePhoto: (photoFile: any) => {
        const formData = new FormData();
        formData.append('image', photoFile);
        return APIBaseUrlInstance.put<UpdatePhotoResponseType>(`/profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => res.data);
    },
    updateProfile: (profile: ProfileType) => {
        return APIBaseUrlInstance.put<ProfileResponseType>(`/profile`, profile).then(res => res.data);
    }
}