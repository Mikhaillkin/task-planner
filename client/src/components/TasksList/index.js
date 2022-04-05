import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useSelector, useDispatch} from 'react-redux';
import {fetchCurrentUserTasksAction} from "../../store/tasksReducer";

import TaskItem from "../TaskItem";
import Loader from "../Loader";

import './TasksList.scss';


const TasksList = () => {
    const dispatch = useDispatch();
    const currentUserTasks = useSelector(state => state.tasksReducer.currentUserTasks);
    const {loading, request, ready} = useHttp();
    const [tasks, setTasks] = useState(currentUserTasks);
    const userData = JSON.parse(localStorage.getItem('userData'));
    // const token = userData && userData.token ? userData.token : '';
    const token = userData?.token;
    const currentUserDataAuthTOKEN = useSelector(state => state.dataAuthReducer?.token);
    const currentUserDataAuthUSERID = useSelector(state => state.dataAuthReducer?.userId);

    console.log('currentUserTasks: ', currentUserTasks);
    console.log('currentUserDataAuthTOKEN: ', currentUserDataAuthTOKEN);
    console.log('currentUserDataAuthUSERID: ', currentUserDataAuthUSERID);

    const getTasks = useCallback(async () => {
        try {
            const data = await request('/api/task/tasks', 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            console.log('Tasks from Server: ', data);
            dispatch(fetchCurrentUserTasksAction(data));

            setTasks(data);
        } catch (e) {
        }
    }, [token, request, dispatch]);

    useEffect(() => {
        getTasks();
    }, [getTasks]);


    const handleUpdateTasksList = () => {
        getTasks();
    }


    if (!ready) {
        return <Loader/>;
    }

    return (
        <ul className="tasks-list">
            {tasks.length === 0 ? (<div className="task-list__content">No Tasks Yet</div>) : null}
            {
                !loading && tasks && tasks.map((task, index) => {
                    return (
                        <TaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            text={task.text}
                            time={task.time}
                            userIdOwner={task._id}
                            index={index}
                            doneStateItem={task.done}
                            onUpdateTasksList={handleUpdateTasksList}
                        />
                    )
                })
            }
        </ul>
    );
};

export default TasksList;