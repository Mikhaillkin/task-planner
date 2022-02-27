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
            <li className="task__item" >
                <div className="item__leftsidecontent">
                    <div className="item__check">
                        <CheckSquareOutlined
                            className="check"
                            onClick={ () => updateTaskDoneState(id,userIdOwner) }
                        />
                    </div>
                    <div>
                        <strong
                            className={cn("item__numerous",{'item__done': doneItem} )}
                        >
                            {`${index + 1})`}
                        </strong>
                    </div>
                    <div className="item__text">
                        <span className={cn({'item__done': doneItem} )}>{text}</span>
                    </div>
                </div>
                <div className="item__edit">
                    <EditOutlined
                        className="edit"
                        onClick={() => history.push(`/task-details/${userIdOwner}`)}
                    />
                </div>
                <div className="item__delete">
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