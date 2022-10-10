import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
}

const Message = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    );
}

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name='Vahagn' id='1'/>
                <DialogItem name='Ani' id='2'/>
                <DialogItem name='Vardan' id='3'/>
                <DialogItem name='Sveta' id='4'/>
                <DialogItem name='Garik' id='5'/>
                <DialogItem name='Arman' id='6'/>
            </div>
            <div className={s.messages}>
                <Message message='Hello'/>
                <Message message='Hi'/>
                <Message message='How are you?'/>
                <Message message='Okay'/>
                <Message message='Fine'/>
                <Message message='Thanks'/>
            </div>
        </div>
    );
}

export default Dialogs;