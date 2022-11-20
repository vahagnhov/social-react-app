import {profileAPI} from "../../api/profileAPI";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../../types/types";
import {AppStateType, BaseThunkType, InferActionsTypes} from "../redux-store";
import {ResultCodeEnum} from "../../api/api";

let initialState = {
    posts: [
        {id: 1, message: 'Hello, how are you?', likesCount: 8},
        {id: 2, message: 'This is my first Post', likesCount: 50},
        {id: 3, message: 'This is my second Post', likesCount: 0},
        {id: 4, message: 'Thanks', likesCount: 17}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'PROFILE_ADD_POST':
            let countPosts = state.posts.length;
            return {
                ...state,
                posts: [...state.posts, {id: countPosts + 1, message: action.newPostText, likesCount: 0}],
            };
        case 'PROFILE_SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };
        case 'PROFILE_SET_STATUS':
            return {
                ...state,
                status: action.status,
            };
        case 'PROFILE_DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            };
        case 'PROFILE_SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        default:
            return state;
    }
};

export const actions = {
    addPostAC: (newPostText: string) => ({type: 'PROFILE_ADD_POST', newPostText} as const),
    deletePostAC: (postId: number) => ({type: 'PROFILE_DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PROFILE_SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE_SET_STATUS', status} as const),
    savePhotoSuccessAC: (photos: PhotosType) => ({
        type: 'PROFILE_SAVE_PHOTO_SUCCESS',
        photos
    } as const),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    if (response && response.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setStatus(response));
    }
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response && response.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}

export const savePhoto = (photoImage: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.updatePhoto(photoImage)
    if (response && response.resultCode === 0) {
        dispatch(actions.savePhotoSuccessAC(response.data.photos));
    }
}

export const saveProfile = (profile: ProfileType)
    : ThunkType => async (dispatch,
                          getState: GetStateType) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.updateProfile(profile)
    if (response && response.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error('User ID can`t be null');
        }
    } else {
        let errorMessage = response.messages.length > 0 ? response.messages[0] : 'Some Error';
        dispatch(stopSubmit('edit-profile', {_error: errorMessage}));
        return Promise.reject(errorMessage)
    }
}

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
type GetStateType = () => AppStateType;

export default profileReducer;