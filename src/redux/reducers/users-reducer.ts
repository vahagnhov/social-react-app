import {usersAPI} from "../../api/usersAPI";
import {followAPI} from "../../api/followAPI";
import {updateObjectInArray} from "../../helpers/object-helpers/object-helpers";
import {UserType} from "../../types/types";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {Dispatch} from "redux";
import {ResultCodeEnum} from "../../api/api";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>  // array of followed user ids
};

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS' :
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

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unFollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setUsersTotalCount: (usersCount: number) => ({type: 'SET_USERS_COUNT', usersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        followingInProgress, userId
    } as const),
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.toggleIsFetching(true));
        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(response.items));
        dispatch(actions.setUsersTotalCount(response.totalCount));
    }
}

const _followUnFollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: Function,
                                   actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(actions.toggleFollowingProgress(true, userId));

    let response = await apiMethod(userId);
    if (response && response.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnFollowFlow(dispatch, userId, followAPI.followUser.bind(followAPI), actions.followSuccess);
    }
}

export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnFollowFlow(dispatch, userId, followAPI.unfollowUser.bind(followAPI), actions.unFollowSuccess);
    }
}

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>

export default usersReducer;