import {DialogType, MessageType} from "../../types/types";

const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {
            id: 1,
            name: 'Vahagn',
            imgSrc: 'https://www.clipartmax.com/png/small/248-2487966_matthew-man-avatar-icon-png.png'
        },
        {
            id: 2,
            name: 'Ani',
            imgSrc: 'https://listimg.pinclipart.com/picdir/s/335-3356471_female-avatar-girls-avatar-clipart.png'
        },
        {
            id: 3,
            name: 'Vardan',
            imgSrc: 'https://cdn-icons-png.flaticon.com/512/236/236832.png'
        },
        {
            id: 4,
            name: 'Sveta',
            imgSrc: 'https://img.lovepik.com/element/40023/3600.png_300.png'
        },
        {
            id: 5,
            name: 'Narine',
            imgSrc: 'https://img.lovepik.com/element/40145/0996.png_300.png'
        },
        {
            id: 6,
            name: 'Arman',
            imgSrc: 'https://img.lovepik.com/free_png/32/30/80/79458PICbe22eZ4e7nMac_PIC2018.png_300.png'
        },
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hello', likesCount: 5},
        {id: 2, message: 'Hi', likesCount: 10},
        {id: 3, message: 'How are you?', likesCount: 0},
        {id: 4, message: 'Okay', likesCount: 2},
        {id: 5, message: 'Fine', likesCount: 7},
        {id: 6, message: 'Thanks', likesCount: 1}
    ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

export const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            let countMessages = state.messages.length;
            return {
                ...state,
                messages: [...state.messages, {id: countMessages + 1, message: body, likesCount: 0}],
            };
        default:
            return state;
    }
};

type ActionsTypes = SendMessageActionType;

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
};

export const sendMessageAC = (newMessageBody: string): SendMessageActionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;