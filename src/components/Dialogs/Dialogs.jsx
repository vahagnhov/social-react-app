import React from "react";
import s from './Dialogs.module.css';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';
import {Navigate} from "react-router-dom";

const Dialogs = (props) => {

    let state = props.dialogPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} imgSrc={d.imgSrc}/>);
    let messagesElements = state.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);

    let newMessageBody = state.newMessageBody;

    let addSendMessageClick = () => {
        props.sendMessage();
    };

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.updateMessageBody(text);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    <textarea placeholder='Enter your message' value={newMessageBody} onChange={onMessageChange}/>
                </div>
                <div>
                    <button onClick={addSendMessageClick}>Add Message</button>
                </div>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;