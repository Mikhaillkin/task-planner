const defaultState = {
    isOpenAddTaskModal: false,
    isOpenDescrTaskModal: false,
    loginFormState: true,
};

const SET_OPEN_ADDTASK_MODAL = 'SET_OPEN_ADDTASK_MODAL';
const SET_OPEN_DESCRTASK_MODAL = 'SET_OPEN_DESCRTASK_MODAL';
const TOGLLER_FOR_CHANGE_AUTHFORM = 'TOGLLER_FOR_CHANGE_AUTHFORM';

export const modalStateReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_OPEN_ADDTASK_MODAL:
            return { ...state, isOpenAddTaskModal: !state.isOpenAddTaskModal };
        case SET_OPEN_DESCRTASK_MODAL:
            return { ...state, isOpenDescrTaskModal: !state.isOpenDescrTaskModal };
        case TOGLLER_FOR_CHANGE_AUTHFORM:
            return { ...state, loginFormState: !state.loginFormState };
        default:
            return state;
    }
};
