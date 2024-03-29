import {instance} from "./api";
import {UserType} from "../types/types";

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
};

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) => {
        return instance.get<UsersResponseType>(`/users`, {
            params: {
                count: pageSize,
                page: currentPage,
                term: term,
                ...(friend ? {friend: friend} : {})
            }
        }).then(res => res.data);
    }
}