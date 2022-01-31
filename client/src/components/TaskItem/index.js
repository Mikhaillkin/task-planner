import React, {useCallback, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";

import cn from 'classnames';
import { CheckSquareOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import './TaskItem.scss';


const TaskItem = ({id,title,text,time,userIdOwner,index, onUpdateTasksList, doneStateItem}) => {
    const [doneItem,setDoneItem] = useState(doneStateItem);
    const history = useHistory();
    const {request} = useHttp();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData && userData.token ? userData.token : '';


    const deleteTask = useCallback(async (id) => {
        try {
            const data = await request('/api/task/delete', 'DELETE', { id:id }, {
                Authorization: `Bearer ${token}`
            });

            // dispatch(removeCurrentUserTaskAction(id));
            onUpdateTasksList && onUpdateTasksList();
        } catch (e) {}
    }, [token,request]);

    const updateTaskDoneState = useCallback( async (id,userIdOwner) => {
        try {
            const data = await request('api/task/done','POST', { id:id, userIdOwner: userIdOwner }, {
                Authorization: `Bearer ${token}`
            });

            // onUpdateTasksList && onUpdateTasksList();
            setDoneItem( prevState => !prevState );
        } catch (e) {}
    } );

    return (
        <>
            <li className="task__item" >
                <span className="item__leftsidecontent">
                    {/*<CheckSquareOutlined className="item__check"  onClick={ () => setDoneItem(prevState => !prevState) } />*/}
                    <CheckSquareOutlined className="item__check"  onClick={ () => updateTaskDoneState(id,userIdOwner) } />
                    <span className={cn({['item__text']: doneItem})}>
                        <strong className="item__number">{ `${index + 1})` }</strong>
                        &nbsp;
                        <span>{text}</span>
                    </span>
                </span>
                <EditOutlined className="item__edit" onClick={() => history.push(`/task-details/${userIdOwner}`)} />
                <DeleteOutlined className="item__delete" onClick={() => deleteTask(id)} />
            </li>
        </>
    );
};

export default TaskItem;