import React from "react";
import s from './Users.module.css';
import userNoPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";

let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div>
                <div><span>{props.totalUsersCount}</span></div>
                {pages.slice(0, 10).map(p => {
                    return (
                        <span key={p}
                              className={`${s.paginationElement} ${props.currentPage === p ? s.selectedPage : ''}`}
                              onClick={(e) => {
                                  props.onPageChange(p)
                              }}>
                            {p}
                        </span>);
                })
                }
                <span> ...  </span>
                {pages.slice(-10).map(p => {
                    return (
                        <span key={p}
                              className={`${s.paginationElement} ${props.currentPage === p ? s.selectedPage : ''}`}
                              onClick={(e) => {
                                  props.onPageChange(p)
                              }}>
                            {p}
                        </span>);
                })
                }
            </div>
            {
                props.users.map(u =>
                    <div key={u.id}>
                        <span>
                             <div>
                                 <NavLink to={'/profile/' + u.id}>
                                 {u.photos && u.photos.small
                                     ? <img alt='User Icon' src={u.photos.small} className={s.userPhoto}/>
                                     : <img alt='User Icon'
                                            src={userNoPhoto}
                                            className={s.userPhoto}/>
                                 }
                                 </NavLink>
                              </div>
                        <div>
                             {u.followed
                                 ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                     props.unFollow(u.id);

                                 }}>UnFollow</button>


                                 : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                     props.follow(u.id);
                                 }}>Follow</button>}
                        </div>
                        </span>

                        <span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                        </span>
                    </div>
                )
            }
        </div>
    );
}

export default Users;