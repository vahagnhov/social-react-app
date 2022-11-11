import {profileAPI} from "../../api/profileAPI";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hello, how are you?', likesCount: 8},
        {id: 2, message: 'This is my first Post', likesCount: 50},
        {id: 3, message: 'This is my second Post', likesCount: 0},
        {id: 4, message: 'Thanks', likesCount: 17}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: '',
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST:
            let countPosts = state.posts.length;
            return {
                ...state,
                posts: [...state.posts, {id: countPosts + 1, message: action.newPostText, likesCount: 0}],
                newPostText: ''
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
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        default:
            return state;
    }
};
type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
};
export const addPostAC = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText});

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
};
export const deletePostAC = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
};
export const savePhotoSuccessAC = (photos: PhotosType): SavePhotoSuccessActionType => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
};
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data));
}

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
};
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response && response.data && response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (photoImage: any) => async (dispatch: any) => {
    let response = await profileAPI.updatePhoto(photoImage)
    if (response && response.data && response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.updateProfile(profile)
    if (response && response.data && response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        let errorMessage = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error';
        dispatch(stopSubmit('edit-profile', {_error: errorMessage}));
        return Promise.reject(errorMessage)
    }
}

export default profileReducer;