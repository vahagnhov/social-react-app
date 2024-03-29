import profileReducer from "./reducers/profile-reducer";
import dialogsReducer from "./reducers/dialogs-reducer";
import sidebarReducer from "./reducers/sidebar-reducer";

let store = {
    _state: {
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
                {id: 5, name: 'Narine', imgSrc: 'https://img.lovepik.com/element/40145/0996.png_300.png'},
                {
                    id: 6,
                    name: 'Arman',
                    imgSrc: 'https://img.lovepik.com/free_png/32/30/80/79458PICbe22eZ4e7nMac_PIC2018.png_300.png'
                },
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
        },
        sidebar: {
            friends: [
                {
                    id: 1,
                    name: 'Ararat',
                    imgSrc: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
                },
                {id: 2, name: 'Anna', imgSrc: 'https://www.w3schools.com/w3images/avatar6.png'},
                {
                    id: 3,
                    name: 'Ruzan',
                    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaLpuGriIZN4x8SRB5FoSbFraR5m4guHTr87YTR-9jg0Pe1RKLNI0RFVP8idliODg20Q4&usqp=CAU'
                },
            ]
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
};

window.store = store;

export default store;