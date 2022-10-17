let initialState = {
    friends: [
        {id: 1, name: 'Ararat', imgSrc: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'},
        {id: 2, name: 'Anna', imgSrc: 'https://www.w3schools.com/w3images/avatar6.png'},
        {id: 3, name: 'Ruzan', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaLpuGriIZN4x8SRB5FoSbFraR5m4guHTr87YTR-9jg0Pe1RKLNI0RFVP8idliODg20Q4&usqp=CAU'},
    ]
};

export const sidebarReducer = (state = initialState, action) => {
    return state;
};

export default sidebarReducer;