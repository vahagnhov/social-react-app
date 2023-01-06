import React, {useEffect, useState} from "react";
///import WebSocket from "ws";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

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
    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages)=>[...prevMessages, ...newMessages]);
        })
    }, []);
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
    const sendMessage = () => {
        if(!message){
            return;
        }
        wsChannel.send(message);
        setMessage('');

    }

    return <div>
        <div>
            <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
}
export default ChatPage;