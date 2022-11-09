import profileReducer, {addPostAC, deletePostAC} from "./profile-reducer";

// 1. test data
let state = {
    posts: [
        {id: 1, message: 'Hello, how are you?', likesCount: 8},
        {id: 2, message: 'This is my first Post', likesCount: 50},
        {id: 3, message: 'This is my second Post', likesCount: 0},
        {id: 4, message: 'Thanks', likesCount: 17}
    ]
};
let newPostText = 'myDomains.com';

test('New post should be added', () => {

    // 2. action
    let action = addPostAC(newPostText);
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(5);

});

test('Length of posts should be increment', () => {

    // 2. action
    let action = addPostAC(newPostText);
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[4].message).toBe(newPostText);

});

test('After deleting length of messages should be decrement', () => {

    // 2. action
    let action = deletePostAC(1);
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);

});

test('After deleting length of messages shouldn`t be decrement if id is incorrect', () => {

    // 2. action
    let action = deletePostAC(1000);
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(4);

});