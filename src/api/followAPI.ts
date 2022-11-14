import {APIBaseUrlInstance} from "./config";
import {ResultCodeEnum} from "../types/types";

type FollowResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
};

export const followAPI = {
    followUser: (userId: number) => {
        return APIBaseUrlInstance.post<FollowResponseType>(`/follow/${userId}`).then(res => res.data);
    },
    unfollowUser:(userId: number) => {
        return APIBaseUrlInstance.delete<FollowResponseType>(`/follow/${userId}`).then(res => res.data);
    }
}