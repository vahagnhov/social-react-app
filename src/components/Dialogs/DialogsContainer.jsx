import React from "react";
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/reducers/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {

    return (<StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().dialogsPage;

                    let sendMessage = () => {
                        let action = sendMessageActionCreator();
                        store.dispatch(action);
                    };

                    let onSendMessageChange = (text) => {
                        let action = updateNewMessageBodyActionCreator(text);
                        store.dispatch(action);
                    };

                    return <Dialogs sendMessage={sendMessage} updateMessageBody={onSendMessageChange} dialogPage={state}/>
                }
        }
        </StoreContext.Consumer>
    );
}

export default DialogsContainer;