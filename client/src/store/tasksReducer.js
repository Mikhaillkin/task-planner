const defaultState = {
    defaultTasks: [
        {
            "id": "-MSjWsPjJfFkNKk6ixPF",
            "title": "Дом дела",
            "text": "Купить хлеб",
            "time": "01/01/2022 в 01:21"
        },
        {
            "id": "-MSjWsPo_nEu6XI67Jjz",
            "title": "Здоровье",
            "text": "Сходить в спортзал",
            "time": "8/01/2022 в 12:28"
        },
        {
            "id": "-MSjWsPo_nEu6XI67Jk-",
            "title": "Срочное",
            "text": "Закрыть задачу до дедлайна",
            "time": "10/01/2022 в 02:28"
        }
    ],
    currentUserTasks: [],
};

const REMOVE_TASK = 'REMOVE_TASK';
const DESCR_TASK = 'DESCR_TASK';
const ADD_TASK = 'ADD_TASK';
const ADD_TASKS = 'ADD_TASKS';

export const tasksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TASKS:
            return { ...state, currentUserTasks: action.payload };
        case ADD_TASK:
            return { ...state, currentUserTasks:  [ ...state.currentUserTasks, action.payload ] };
        case REMOVE_TASK:
            return { ...state, defaultTasks: state.defaultTasks.filter( ({id}) => id !== action.payload ) };
        case DESCR_TASK:
            return { ...state, tempTaskDescription: [ action.payload ] };
        default:
            return state;
    }
};

export const removeCurrentUserTaskAction = (payload) => ({type: REMOVE_TASK, payload});
export const addCurrentUserTaskAction = (payload) => ({type:ADD_TASK, payload});
export const addCurrentUserTasksAction = (payload) => ({type:ADD_TASKS, payload});
