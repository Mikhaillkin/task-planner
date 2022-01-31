const defaultState = {
    token: null,
    userId: null,
    isAuthenticated: false,
}

const CHANGE_AUTH_STATE = 'CHANGE_AUTH_STATE';
const SET_TOKEN = 'SET_TOKEN';
const SET_USERID = 'SET_USERID';

export const loginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_AUTH_STATE:
            return { ...state, isAuthenticated: !state.isAuthenticated };
        case SET_TOKEN:
            return { ...state, token: action.payload };
        case SET_USERID:
            return { ...state, userId: action.payload };
        default:
            return state;
    }
}

export const setTokenAction = (payload) => ({type:SET_TOKEN, payload});
export const setUserIdAction = (payload) => ({type:SET_USERID, payload});
export const changeAuthStateAction = () => ({type:CHANGE_AUTH_STATE});