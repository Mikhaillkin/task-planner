const defaultState = {
    token: null,
    userId: null
}

const SET_AUTH_DATA = 'SET_AUTH_DATA';
const DELETE_AUTH_DATA = 'DELETE_AUTH_DATA';

export const dataAuthReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA:
            return { ...state,token: action.payload.token,userId: action.payload.userId };
        case DELETE_AUTH_DATA:
            return { ...state,token: null,userId: null };
        default:
            return state;
    }
}


export const setAuthDataAction = (payload) => ({type:SET_AUTH_DATA, payload});
export const deleteAuthDataAction = () => ({type:DELETE_AUTH_DATA});