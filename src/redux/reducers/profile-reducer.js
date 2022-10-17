const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    posts: [
        {id: 1, message: 'Hello, how are you?', likesCount: 8},
        {id: 2, message: 'This is my first Post', likesCount: 50},
        {id: 3, message: 'This is my second Post', likesCount: 0},
        {id: 4, message: 'Thanks', likesCount: 17}
    ],
    newPostText: 'example.com'
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let countPosts = state.posts.length;
            let newPost = {
                id: countPosts + 1, message: state.newPostText, likesCount: 0
            };
            state.posts.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText;
            return state;
        default:
            return state;
    }
};
export const addPostActionCreator = () => ({ type: ADD_POST});

export const updatePostActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newPostText: text});

export default profileReducer;