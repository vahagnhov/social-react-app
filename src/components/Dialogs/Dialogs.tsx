import React, {FC} from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import AddNewMessageReduxForm from "./AddNewMessageForm/AddNewMessageForm";
import {DialogType, MessageType} from "../../types/types";

type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    sendMessage: (newMessage: string) => void
};

const Dialogs: FC<PropsType> = ({dialogs, messages, sendMessage}) => {

    let dialogsElements = dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} imgSrc={d.imgSrc}/>);
    let messagesElements = messages.reverse().map(m => <Message key={m.id} id={m.id} message={m.message}/>);

    let addNewMessage = (formData: any) => {
        sendMessage(formData.newMessageBody);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <AddNewMessageReduxForm onSubmit={addNewMessage}/>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;