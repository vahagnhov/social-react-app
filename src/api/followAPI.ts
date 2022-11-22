import {APIResponseType, instance, ResultCodeEnum} from "./api";

export const followAPI = {
    followUser: (userId: number) => {
        return instance.post<APIResponseType>(`/follow/${userId}`).then(res => res.data);
    },
    unfollowUser:(userId: number) => {
        return instance.delete(`/follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
    }
}