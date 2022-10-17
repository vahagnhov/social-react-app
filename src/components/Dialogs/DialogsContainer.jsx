import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/reducers/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    let state = props.store.getState().dialogsPage;

    let sendMessage = () => {
      let action = sendMessageActionCreator();
      props.store.dispatch(action);
    };

    let onSendMessageChange = (text) => {
        let action = updateNewMessageBodyActionCreator(text);
        props.store.dispatch(action);
    };

    return (<Dialogs sendMessage={sendMessage} updateMessageBody={onSendMessageChange} dialogPage={state}/>);
}

export default DialogsContainer;