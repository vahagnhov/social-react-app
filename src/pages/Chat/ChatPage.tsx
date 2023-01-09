import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/reducers/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

export type ChatMessageType = {
    message: string,
    photo: string
    userId: number,
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(startMessagesListening())
        return () => {
            dispatch<any>(stopMessagesListening())
        }
    }, [dispatch])

    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    console.log('MMMMMMMm')
    console.log(messages)
    console.log('MMMMMMMm')

    return <div style={{height: '400px', overflowY: 'auto'}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img alt='Author message' src={message.photo} style={{width: '50px'}}/><b>{message.userName}</b>
        <div>
            {message.message}
        </div>
        <hr/>
    </div>
}

const AddMessageForm: React.FC = () => {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch<any>(sendMessage(message));
        setMessage('');
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={false} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}
export default ChatPage;