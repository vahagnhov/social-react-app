import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {chatAPI, ChatMessageType} from "../../api/chatAPI";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as ChatMessageType[],
};

export const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'CHAT_MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: 'CHAT_MESSAGES_RECEIVED',
        payload: {messages}
    } as const),

}


let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    console.log('startMessagesListening');
    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    console.log('stopMessagesListening');
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
    chatAPI.stop();
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    console.log('sendMessage - '+ message);
    chatAPI.sendMessage(message);
}

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export default chatReducer;