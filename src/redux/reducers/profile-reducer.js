import {profileAPI} from "../../api/profileAPI";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        {id: 1, message: 'Hello, how are you?', likesCount: 8},
        {id: 2, message: 'This is my first Post', likesCount: 50},
        {id: 3, message: 'This is my second Post', likesCount: 0},
        {id: 4, message: 'Thanks', likesCount: 17}
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let countPosts = state.posts.length;
            return {
                ...state,
                posts: [...state.posts, {id: countPosts + 1, message: action.newPostText, likesCount: 0}]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            };
        default:
            return state;
    }
};
export const addPostAC = (newPostText) => ({ type: ADD_POST, newPostText});

export const deletePostAC = (postId) => ({ type: DELETE_POST, postId});

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            });
    }
}

export const setStatus = (status) => ({ type: SET_STATUS, status});

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            });
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if(response.data.resultCode === 0){
                    dispatch(setStatus(status));
                }
            });
    }
}

export default profileReducer;