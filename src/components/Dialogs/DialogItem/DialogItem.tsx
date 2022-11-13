import React, {FC} from "react";
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import userNoPhoto from '../../../assets/images/user.png'
import {DialogType} from "../../../types/types";

const DialogItem: FC<DialogType> = ({id, name, imgSrc}) => {
    let path = '/dialogs/' + id;
    return (
        <div className={s.dialog + ' ' + s.active} >
            <NavLink to={path}>
                {imgSrc ? <img alt='Avatar' src={imgSrc}/> : <img alt='Avatar' src={userNoPhoto}/>}
                {name}
            </NavLink>
        </div>
    );
}

export default DialogItem;