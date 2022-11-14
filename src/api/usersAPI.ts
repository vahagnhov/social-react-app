import {APIBaseUrlInstance} from "./config";
import {UserType} from "../types/types";

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
};

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return APIBaseUrlInstance.get<UsersResponseType>(`/users`, {
            params: {
                count: pageSize,
                page: currentPage
            }
        }).then(res => res.data);
    }
}