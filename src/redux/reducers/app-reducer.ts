import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'APP_INITIALIZED_SUCCESS';


type InitialStateType = {
    initialized: boolean
};

let initialState: InitialStateType = {
    initialized: false
};

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
};

type ActionsTypes = initializedSuccessActionType;

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
};

export const initializedSuccess = (): initializedSuccessActionType => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;