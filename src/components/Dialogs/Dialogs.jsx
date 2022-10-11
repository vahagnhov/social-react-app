import React from "react";
import s from './Dialogs.module.css';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';

const Dialogs = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem id={d.id} name={d.name}/>);
    let messagesElements = props.messages.map(m => <Message id={m.id} message={m.message}/>);

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