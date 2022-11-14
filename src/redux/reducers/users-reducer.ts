import {usersAPI} from "../../api/usersAPI";
import {followAPI} from "../../api/followAPI";
import {updateObjectInArray} from "../../helpers/object-helpers/object-helpers";
import {ResultCodeEnum, UserType} from "../../types/types";
import {AppStateType} from "../redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>  // array of followed user ids
};

export type InitialStateType = typeof initialState;

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS :
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

type ActionsTypes = FollowSuccessActionType | UnFollowSuccessActionType | SetUsersActionType |
    SetCurrentPageActionType | SetUsersTotalCountActionType | ToggleIsFetchingActionType |
    ToggleFollowingProgressActionType;


type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
};
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});

type UnFollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
};
export const unFollowSuccess = (userId: number): UnFollowSuccessActionType => ({type: UNFOLLOW, userId});

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
};

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    currentPage
});

type SetUsersTotalCountActionType = {
    type: typeof SET_USERS_COUNT,
    usersCount: number
};
export const setUsersTotalCount = (usersCount: number): SetUsersTotalCountActionType => ({
    type: SET_USERS_COUNT,
    usersCount
});

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
};

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
});

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress: boolean,
    userId: number
};
export const toggleFollowingProgress = (followingInProgress: boolean, userId: number)
    : ToggleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    userId
});

type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));
        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.items));
        dispatch(setUsersTotalCount(response.totalCount));
    }
}

const _followUnFollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: Function,
                                   actionCreator: (userId: number) => FollowSuccessActionType | UnFollowSuccessActionType) => {

    dispatch(toggleFollowingProgress(true, userId));

    let response = await apiMethod(userId);
    if (response && response.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnFollowFlow(dispatch, userId, followAPI.followUser.bind(followAPI), followSuccess);
    }
}

export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnFollowFlow(dispatch, userId, followAPI.unfollowUser.bind(followAPI), unFollowSuccess);
    }
}

export default usersReducer;