import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = (props) => {
    return (
        <div>
            <Paginator
                currentPage={props.currentPage}
                onPageChange={props.onPageChange}
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}/>
            <div>
                {
                    props.users.map(u => <User user={u}
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