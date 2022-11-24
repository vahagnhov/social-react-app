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

type PropsType = {};

const Users: FC<PropsType> = () => {

    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatchType = useDispatch()

    useEffect(() => { // componentDidMount [] - only one time on init
        dispatch<any>(requestUsers(currentPage, pageSize, filter));
    }, [])

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