import React, {FC} from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
};

const Header: FC<PropsType> = ({isAuth, login, logout }) => {
    return (
        <div className={s.header}>
            <img alt='logo' src='https://i.pinimg.com/236x/71/b3/e4/71b3e4159892bb319292ab3b76900930.jpg'/>
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login} <button onClick={logout}>Logout</button></div>
                    :  <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>
    );
}

export default Header;