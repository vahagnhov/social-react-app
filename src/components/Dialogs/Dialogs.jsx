import React from "react";
import s from './Dialogs.module.css';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';
import {Field, reduxForm} from "redux-form";

const AddNewMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component='textarea' name='newMessageBody' placeholder='Enter your message'/>
            </div>
            <div>
                <button>Add Message</button>
            </div>
        </form>
    );
}

const AddNewMessageReduxForm = reduxForm({form: 'dialogsAddNewMessageForm'})(AddNewMessageForm);

const Dialogs = (props) => {

    let state = props.dialogPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} imgSrc={d.imgSrc}/>);
    let messagesElements = state.messages.map(m => <Message key={m.id} id={m.id} message={m.message}/>);

    let addNewMessage = (formData) => {
        props.sendMessage(formData.newMessageBody);
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