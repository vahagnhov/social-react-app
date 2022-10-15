let store = {
    _state:{
        profilePage: {
            posts: [
                {id: 1, message: 'Hello, how are you?', likesCount: 8},
                {id: 2, message: 'This is my first Post', likesCount: 50},
                {id: 3, message: 'This is my second Post', likesCount: 0},
                {id: 4, message: 'Thanks', likesCount: 17}
            ],
            newPostText: 'example.com'
        },
        dialogsPage: {
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
        },
        sidebar: {
            friends: [
                {id: 1, name: 'Ararat', imgSrc: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'},
                {id: 2, name: 'Anna', imgSrc: 'https://www.w3schools.com/w3images/avatar6.png'},
                {id: 3, name: 'Ruzan', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaLpuGriIZN4x8SRB5FoSbFraR5m4guHTr87YTR-9jg0Pe1RKLNI0RFVP8idliODg20Q4&usqp=CAU'},
            ]
        }
    },
    getState(){
      return this._state;
    },
    _callSubscriber() {
        console.log('State changed');
    },
    addPost() {
        let newPost = {
            id: 5, message:  this._state.profilePage.newPostText, likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    addMessage(dialogsMessage){
        let newMessage = {
            id: 5, message: dialogsMessage, likesCount: 0
        };
        this._state.dialogsPage.messages.push(newMessage);
        this._callSubscriber( this._state);
    },
    updateNewPostText(newPostText) {
        this._state.profilePage.newPostText = newPostText;
        this._callSubscriber( this._state);
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    }
};

window.store = store;

export default store;