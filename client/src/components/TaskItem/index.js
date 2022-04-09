import React, {useCallback, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import { useDispatch } from 'react-redux';
import {removeCurrentUserTaskAction} from "../../store/tasksReducer";

import cn from 'classnames';
import { CheckSquareOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import './TaskItem.scss';


const TaskItem = ({id,title,text,time,userIdOwner,index, onUpdateTasksList, doneStateItem}) => {
    const dispatch = useDispatch();
    const [doneItem,setDoneItem] = useState(doneStateItem);
    const history = useHistory();
    const {request} = useHttp();
    const userData = JSON.parse(localStorage.getItem('userData'));
    // const token = userData && userData.token ? userData.token : '';
    const token = userData?.token;


    const deleteTask = useCallback(async (id) => {
        try {
            await request('/api/task/delete', 'DELETE', { id:id }, {
                Authorization: `Bearer ${token}`
            });

            dispatch(removeCurrentUserTaskAction(id));
            onUpdateTasksList && onUpdateTasksList();
        } catch (e) {}
    }, [token,request,dispatch,onUpdateTasksList]);

    const updateTaskDoneState = useCallback( async (id,userIdOwner) => {
        try {
            await request('api/task/done','POST', { id:id, userIdOwner: userIdOwner }, {
                Authorization: `Bearer ${token}`
            });

            setDoneItem( prevState => !prevState );
        } catch (e) {}
    },[request,token]);

    return (
        <>
            <li
                className={cn(
                    'task-item',
                    {'task-item-done': doneItem}
                )}
            >
                <div className="task-item__column task-item__check">
                    <CheckSquareOutlined
                        className={cn(
                            'check',
                            {'check-done': doneItem}
                            )}
                        onClick={ () => updateTaskDoneState(id,userIdOwner) }
                    />
                </div>
                <div className="task-item__column task-item__content">
                    {/*<div className="task-item__text">{text}</div>*/}
                    <div className="task-item__title">{title}</div>
                    <div className="task-item__time">{time}</div>
                </div>
                <div className="task-item__column task-item__description">
                    <EditOutlined
                        className="edit"
                        onClick={() => history.push(`/task-details/${userIdOwner}`)}
                    />
                </div>
                <div className="task-item__column task-item__delete">
                    <DeleteOutlined
                        className="delete"
                        onClick={() => deleteTask(id)}
                    />
                </div>
            </li>
        </>
    );
};

export default TaskItem;