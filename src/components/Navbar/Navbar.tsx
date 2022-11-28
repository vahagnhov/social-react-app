import React, {FC} from "react";
import s from './Navbar.module.css';
import {FriendType} from "../../types/types";
import userNoPhoto from '../../assets/images/user.png'

const Friend: FC<FriendType> = ({name, imgSrc}) => {
    return (
        <div className={s.friendBlock}>
            {imgSrc ? <img alt='friend avatar' src={imgSrc}/> : <img alt='friend avatar' src={userNoPhoto}/>}
            <div>
                {name}
            </div>
        </div>
    );
};

type NavbarPropsType = {
    friends: Array<FriendType>
};

const Navbar: FC<NavbarPropsType> = ({friends}) => {

    let myFriends = friends.map(f => <Friend key={f.id} id={f.id} name={f.name} imgSrc={f.imgSrc}/>)

    return (
        <nav className={s.nav}>
            <div className={s.friend}>
                <h2><span>Friends</span></h2>
                {myFriends}
            </div>
        </nav>
    );
}

export default Navbar;