import React, {FC} from "react";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import LogoImage  from '../../assets/images/logo.jpg'
import {MapDispatchToPropsType, MapStateToPropsType} from "./HeaderContainer";

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const Header: FC<PropsType> = ({isAuth, login, logout }) => {
    return (
        <div className={s.header}>
            <img alt='logo' src={LogoImage}/>
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>{login} <button onClick={logout}>Logout</button></div>
                    :  <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>
    );
}

export default Header;