const defaultState = {
    currentUserTasks: [],
};

const REMOVE_TASK = 'REMOVE_TASK';
const FETCH_TASKS = 'FETCH_TASKS';

export const tasksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_TASKS:
            return { ...state, currentUserTasks: action.payload };
        case REMOVE_TASK:
            return { ...state, currentUserTasks: state.currentUserTasks.filter( ({id}) => id !== action.payload ) };
        default:
            return state;
    }
};

export const removeCurrentUserTaskAction = (payload) => ({type: REMOVE_TASK, payload});
export const fetchCurrentUserTasksAction = (payload) => ({type:FETCH_TASKS, payload});
