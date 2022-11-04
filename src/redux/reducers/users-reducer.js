import {usersAPI} from "../../api/usersAPI";
import {followAPI} from "../../api/followAPI";
import {updateObjectInArray} from "../../helpers/object-helpers/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: null,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

export const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                /*users: state.users.map(u => {  //  users: {...state.users}
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })*/
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
export const followSuccess = (userId) => ({type: FOLLOW, userId});

export const unFollowSuccess = (userId) => ({type: UNFOLLOW, userId});

export const setUsers = (users) => ({type: SET_USERS, users});

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});

export const setUsersTotalCount = (usersCount) => ({type: SET_USERS_COUNT, usersCount});

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const toggleFollowingProgress = (followingInProgress, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    followingInProgress,
    userId
});

export const requestUsers = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));
        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setUsersTotalCount(response.data.totalCount));
    }
}

const followUnFollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(toggleFollowingProgress(true, userId));

    let response = await apiMethod(userId);
    if (response && response.data && response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

/*export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        followAPI.followUser(userId).then(response => {
            if (response && response.data && response.data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        });
    }
}*/

export const follow = (userId) => {
    return async (dispatch) => {
        followUnFollowFlow(dispatch, userId, followAPI.followUser.bind(followAPI), followSuccess);
    }
}

export const unFollow = (userId) => {
    return async (dispatch) => {
        followUnFollowFlow(dispatch, userId, followAPI.unfollowUser.bind(followAPI), unFollowSuccess);
    }
}

export default usersReducer;