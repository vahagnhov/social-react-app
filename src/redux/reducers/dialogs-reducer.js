const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
    dialogs: [
        {id: 1, name: 'Vahagn', imgSrc: 'https://www.clipartmax.com/png/small/248-2487966_matthew-man-avatar-icon-png.png'},
        {id: 2, name: 'Ani', imgSrc: 'https://listimg.pinclipart.com/picdir/s/335-3356471_female-avatar-girls-avatar-clipart.png'},
        {id: 3, name: 'Vardan', imgSrc: 'https://www.clipartmax.com/png/small/248-2487966_matthew-man-avatar-icon-png.png'},
        {id: 4, name: 'Sveta', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTWdr4oEstNFlSHxIyfDvcOaPY52x81H3N5QwSZo8pnPLV7vV3lahuIC3vBdCMWA2CbAo&usqp=CAU'},
        {id: 5, name: 'Narine', imgSrc: 'https://img.lovepik.com/element/40145/0996.png_300.png'},
        {id: 6, name: 'Arman', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxa1JLDaWAt2sl4MiJCTKkPNxlklH_qLnkhYvrh_0MHXXdWRiqC_7_c2BLEd_uYfoDgfA&usqp=CAU'},
    ],
    messages: [
        {id: 1, message: 'Hello'},
        {id: 2, message: 'Hi'},
        {id: 3, message: 'How are you?'},
        {id: 4, message: 'Okay'},
        {id: 5, message: 'Fine'},
        {id: 6, message: 'Thanks'}
    ],
    newMessageBody: ""
};

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            let countMessages = state.messages.length;
            let newMessage = {
                id: countMessages + 1, message: body, likesCount: 0
            };
            state.messages.push(newMessage);
            state.newMessageBody = '';
            return state;
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;
        default:
            return state;
    }
};

export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE});

export const updateNewMessageBodyActionCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body});

export default dialogsReducer;