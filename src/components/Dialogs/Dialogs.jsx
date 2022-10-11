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

    let dialogsData = [
        {id: 1, name: 'Vahagn'},
        {id: 2, name: 'Ani'},
        {id: 3, name: 'Vardan'},
        {id: 4, name: 'Sveta'},
        {id: 5, name: 'Garik'},
        {id: 6, name: 'Arman'}
    ];

    let messagesData = [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'Okay'},
        {id: 5, message: 'Fine'},
        {id: 6, message: 'Thanks'}
    ];

    let dialogsElements = dialogsData.map(d => <DialogItem id={d.id} name={d.name}/>);
    let messagesElements = messagesData.map(m => <Message id={m.id} message={m.message}/>);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;