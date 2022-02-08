const defaultState = {
    currentUserTasks: [],
};

const REMOVE_TASK = 'REMOVE_TASK';
const FETCH_TASKS = 'FETCH_TASKS';
const CLEAN_TASKS_CURRENTUSER = 'CLEAN_TASKS_CURRENTUSER';

export const tasksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_TASKS:
            return { ...state, currentUserTasks: action.payload };
        case REMOVE_TASK:
            return { ...state, currentUserTasks: state.currentUserTasks.filter( ({id}) => id !== action.payload ) };
        case CLEAN_TASKS_CURRENTUSER:
            return { ...state,currentUserTasks: [] }
        default:
            return state;
    }
};

export const removeCurrentUserTaskAction = (payload) => ({type: REMOVE_TASK, payload});
export const fetchCurrentUserTasksAction = (payload) => ({type:FETCH_TASKS, payload});
export const cleanTasksCurrentUser = () => ({type:CLEAN_TASKS_CURRENTUSER});
