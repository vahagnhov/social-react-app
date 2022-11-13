import React, {FC} from "react";
import s from './User.module.css';
import userNoPhoto from '../../assets/images/user.png';
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
};

const User: FC<PropsType> = ({user, followingInProgress, unFollow, follow }) => {
    let u = user;
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
                             ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                 unFollow(u.id);

                             }} className={s.followButton}>UnFollow</button>


                             : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                                 follow(u.id);
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