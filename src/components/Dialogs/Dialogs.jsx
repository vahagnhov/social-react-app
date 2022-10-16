import React from "react";
import s from './Dialogs.module.css';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/reducers/dialogs-reducer";

const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;
    let dialogsElements = state.dialogs.map(d => <DialogItem id={d.id} name={d.name} imgSrc={d.imgSrc}/>);
    let messagesElements = state.messages.map(m => <Message id={m.id} message={m.message}/>);

    let newMessageBody = state.newMessageBody;

    let addSendMessageClick = () => {
      let action = sendMessageActionCreator();
      props.store.dispatch(action);
    };

    let onMessageChange = (e) => {
        let text = e.target.value;
        let action = updateNewMessageBodyActionCreator(text);
        props.store.dispatch(action);
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