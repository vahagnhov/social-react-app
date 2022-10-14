import React from "react";
import s from './Dialogs.module.css';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name} imgSrc={d.imgSrc}/>);
    let messagesElements = props.state.messages.map(m => <Message id={m.id} message={m.message}/>);

    let newMessageElement = React.createRef();
    let addMessage = () => {
      let text = newMessageElement.current.value;
      props.addMessage(text);
      newMessageElement.current.value = '';
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>
                    <textarea ref={newMessageElement}></textarea>
                </div>
                <div>
                    <button onClick={addMessage}>Add Message</button>
                </div>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;