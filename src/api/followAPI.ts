import {instance, ResultCodeEnum} from "./api";

type FollowResponseType = {
    data: {}
    resultCode: ResultCodeEnum
    messages: Array<string>
};

export const followAPI = {
    followUser: (userId: number) => {
        return instance.post<FollowResponseType>(`/follow/${userId}`).then(res => res.data);
    },
    unfollowUser:(userId: number) => {
        return instance.delete<FollowResponseType>(`/follow/${userId}`).then(res => res.data);
    }
}