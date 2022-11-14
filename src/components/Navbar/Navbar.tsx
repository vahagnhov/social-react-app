import React, {FC} from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {FriendType} from "../../types/types";
import userNoPhoto from '../../assets/images/user.png'

const Friend: FC<FriendType> = ({id, name, imgSrc}) => {
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
            <div className={s.item}>
                <NavLink to='/profile' className={(navData) => navData.isActive ? s.activeLink : ""}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.activeLink}`}>
                <NavLink to='/dialogs' className={(navData) => navData.isActive ? s.activeLink : ""}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' className={(navData) => navData.isActive ? s.activeLink : ""}>Users</NavLink>
            </div>
            <div className={s.friend}>
                <h2><span>Friends</span></h2>
                {myFriends}
            </div>
        </nav>
    );
}

export default Navbar;