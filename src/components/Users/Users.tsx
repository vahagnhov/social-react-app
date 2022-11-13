import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChange: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
};

const Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChange, users,
                                  ...props
                              }) => {
    return (
        <div>
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