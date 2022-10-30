import {APIBaseUrlInstance} from "./config";

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10) => {
        return APIBaseUrlInstance.get(`/users`, {
            params: {
                count: pageSize,
                page: currentPage
            }
        });
    }
}