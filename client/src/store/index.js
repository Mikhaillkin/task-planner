import { createStore,combineReducers,applyMiddleware } from "redux";
import { tasksReducer } from "./tasksReducer";
import { modalStateReducer } from "./modalStateReducer";
import { authReducer } from "./authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    tasksReducer,
    modalStateReducer,
    authReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));