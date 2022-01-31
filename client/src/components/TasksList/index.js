import React, {useCallback, useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
// import { useSelector,useDispatch } from 'react-redux';

import TaskItem from "../TaskItem";
import Loader from "../Loader";

import './TasksList.scss';
// import {addCurrentUserTasksAction} from "../../store/tasksReducer";


const TasksList = () => {
    // const dispatch = useDispatch();
    // const currentUserTasks = useSelector( state => state.tasksReducer.currentUserTasks );
    const {loading,request,ready} = useHttp();
    const [tasks,setTasks] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData && userData.token ? userData.token : '';

    const getTasks = useCallback(async () => {
        try {
            const data = await request('/api/task/tasks', 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            console.log(data);
            // dispatch(addCurrentUserTasksAction(data));

            setTasks(data);
        } catch (e) {}
    }, [token,request]);

    useEffect(() => {
        getTasks();
    }, [getTasks]);


    const handleUpdateTasksList = () => {
        getTasks();
    }


    if (!ready) {
        return <Loader />;  //Определи компонент лоадер и вызови его в return здесь
    }

    return (
        <>
            <ul className="tasks__items">
                { tasks.length === 0 ? (<div>No Tasks Yet</div>) : null  }
                {
                    // Object.entries(DEFAULTTASKS).length ? (Object.entries(DEFAULTTASKS).map(([key,{id,title,text,time}],index) => {
                    // tasks.length ? tasks.map(({id,title,text,time},index) => {
                    //     return (
                    //         <TaskItem
                    //             key={id}
                    //             id={id}
                    //             title={title}
                    //             text={text}
                    //             time={time}
                    //             index={index}
                    //         />
                    //     )
                    // }) : <p>No tasks yet</p>

                    // !loading && tasks && tasks.map((task,index) => {
                    !loading && tasks && tasks.map((task,index) => {
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
        </>
    );
};

export default TasksList;