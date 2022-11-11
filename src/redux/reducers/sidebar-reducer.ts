type FriendType = {
    id: number,
    name: string,
    imgSrc: string | null
}

let initialState = {
    friends: [
        {id: 1, name: 'Ararat', imgSrc: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'},
        {id: 2, name: 'Anna', imgSrc: 'https://www.w3schools.com/w3images/avatar6.png'},
        {id: 3, name: 'Ruzan', imgSrc: 'https://pic.616pic.com/ys_img/00/08/96/kZOxMXNJau.jpg'},
    ] as Array<FriendType>
};

export type InitialStateType = typeof initialState;

export const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
};

export default sidebarReducer;