import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({currentPage, totalUsersCount, pageSize, onPageChange, users, ...props}) => {
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