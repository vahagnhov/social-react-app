import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType} from "../../redux/reducers/users-reducer";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    onFilterChange: (filter: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
};

const Users: FC<PropsType> = ({
                                  currentPage, totalUsersCount, pageSize,
                                  onPageChange, onFilterChange, users,
                                  ...props
                              }) => {
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
                                         followingInProgress={props.followingInProgress}
                                         follow={props.follow}
                                         unFollow={props.unFollow}
                    />)
                }
            </div>
        </div>
    );
}

export default Users;