import React from "react";
import s from './User.module.css';
import userNoPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";

const User = (props) => {
    let u = props.user;
    return (
        <div>
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

                             }} className={s.followButton}>UnFollow</button>


                             : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                 props.follow(u.id);
                             }} className={s.followButton}>Follow</button>}
                    </div>
              </span>
            <span>
                   <span>
                       <div>{u.name}</div>
                       <div>{u.status}</div>
                   </span>
              </span>
        </div>
    );
}

export default User;