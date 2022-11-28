import React, {FC, useEffect} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, follow, requestUsers, unFollow} from "../../redux/reducers/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/selectors/users-selectors";
import {AppDispatchType} from "../../redux/redux-store";
import {useLocation, useNavigate} from "react-router-dom";
import * as queryString from "query-string";

type PropsType = {};

type QueryParamsType = { term?: string; page?: string; friend?: string }

const Users: FC<PropsType> = () => {

    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatchType = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const parsed = queryString.parse(location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch<any>(requestUsers(actualPage, pageSize, actualFilter));
    }, [])


    useEffect(() => {

        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/developers',
            search: queryString.stringify(query)

        });
    }, [filter, currentPage])


    const onPageChange = (pageNumber: number) => {
        dispatch<any>(requestUsers(pageNumber, pageSize, filter));
    }

    const onFilterChange = (filter: FilterType) => {
        dispatch<any>(requestUsers(1, pageSize, filter));
    }

    const followUser = (userId: number) => {
        dispatch<any>(follow(userId));
    }

    const unFollowUser = (userId: number) => {
        dispatch<any>(unFollow(userId));
    }

    return (
        <div>
            <UsersSearchForm onFilterChange={onFilterChange}/>
            <Paginator
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}/>
            <div>
                {
                    users.map(u => <User user={u}
                                         key={u.id}
                                         followingInProgress={followingInProgress}
                                         follow={followUser}
                                         unFollow={unFollowUser}
                    />)
                }
            </div>
        </div>
    );
}

export default Users;