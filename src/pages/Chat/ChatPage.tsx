import React, {useEffect, useState} from "react";

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;
        let closeHandler = () => {
            console.log('Close WS');
            setTimeout(connectChannel, 3000);
        }

        function connectChannel() {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws);
        }

        connectChannel();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        }

    }, []);

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        }
        wsChannel?.addEventListener('message', messageHandler);

        return () => {
            wsChannel?.removeEventListener('message', messageHandler);
        }

    }, [wsChannel]);
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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready');
        }
        wsChannel?.addEventListener('open', openHandler);
        return () => {
            wsChannel?.removeEventListener('open', openHandler);
        }
    }, [wsChannel]);

    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel?.send(message);
        setMessage('');
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
        </div>
    </div>
}
export default ChatPage;