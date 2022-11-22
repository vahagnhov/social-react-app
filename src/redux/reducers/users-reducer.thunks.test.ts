import {actions, follow, unFollow} from './users-reducer';
import {followAPI} from "../../api/followAPI";
import {APIResponseType, ResultCodeEnum} from "../../api/api";

jest.mock('../../api/followAPI');
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    followAPIMock.followUser.mockClear();
    followAPIMock.unfollowUser.mockClear();
})

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

followAPIMock.followUser.mockReturnValue(Promise.resolve(result));
followAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));

test('thunk follow', async () => {
    const thunk = follow(1);

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
    const thunk = unFollow(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unFollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})