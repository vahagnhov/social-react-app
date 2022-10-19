import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    return (
        <div className={s.friendBlock}>
            <img alt='friend avatar' src={props.imgSrc}/>
            <div>
                {props.name}
            </div>
        </div>
    );
};

const Navbar = (props) => {

    let state = props.sidebar;
    let friends = state.friends.map(f => <Friend key={f.id} id={f.id} name={f.name} imgSrc={f.imgSrc}/>)

    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' className={(navData) => navData.isActive ? s.activeLink : ""}>Profile</NavLink>
            </div>
            <div className={`${s.item} ${s.active}`}>
                <NavLink to='/dialogs' className={(navData) => navData.isActive ? s.activeLink : ""}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' className={(navData) => navData.isActive ? s.activeLink : ""}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' className={(navData) => navData.isActive ? s.activeLink : ""}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' className={(navData) => navData.isActive ? s.activeLink : ""}>Settings</NavLink>
            </div>
            <div className={s.friend}>
                <h2><span>Friends</span></h2>
                {friends}
            </div>
        </nav>
    );
}

export default Navbar;