const defaultState = {
    loginFormState: true,
};


const TOGLLER_FOR_CHANGE_AUTHFORM = 'TOGLLER_FOR_CHANGE_AUTHFORM';

export const modalStateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TOGLLER_FOR_CHANGE_AUTHFORM:
            return { ...state, loginFormState: !state.loginFormState };
        default:
            return state;
    }
};


export const changeAuthFormModalAction = () => ({type:TOGLLER_FOR_CHANGE_AUTHFORM});