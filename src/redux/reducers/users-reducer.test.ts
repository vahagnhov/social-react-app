import {actions, InitialStateType, usersReducer} from './users-reducer';

let state: InitialStateType;

beforeEach(() => { // after 1 expect , go and get original state
    state = {
        users: [
            {
                id: 0, name: 'Vah 0', followed: false,
                photos: {small: null, large: null}, status: 'Status 0'
            },
            {
                id: 1, name: 'Vah 1', followed: false,
                photos: {small: null, large: null}, status: 'Status1'
            },
            {
                id: 2, name: 'Vah 2', followed: true,
                photos: {small: null, large: null}, status: 'Status 2'
            },
            {
                id: 3, name: 'Vah 3', followed: true,
                photos: {small: null, large: null}, status: 'Status 3'
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: 'all' as string | boolean
        }
    }

})

test('follow Success', () => {

    const newState = usersReducer(state, actions.followSuccess(1));

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test('unFollow Success', () => {

    const newState = usersReducer(state, actions.unFollowSuccess(3));

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});