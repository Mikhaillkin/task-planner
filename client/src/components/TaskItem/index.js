import React, {useCallback, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
// import { useSelector,useDispatch } from 'react-redux';

import cn from 'classnames';
import { CheckSquareOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';
import './TaskItem.scss';
// import {removeCurrentUserTaskAction} from "../../store/tasksReducer";


const TaskItem = ({id,title,text,time,userIdOwner,index}) => {
    // const dispatch = useDispatch();
    // const currentUserTasks = useSelector( state => state.tasksReducer.currentUserTasks );

    const [doneItem, setDoneItem] = useState(false);
    const history = useHistory();
    const {request} = useHttp();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData && userData.token ? userData.token : '';

    // console.log('CurrentUserTasks: ',currentUserTasks);


    const deleteTask = useCallback(async (id) => {
        try {
            const data = await request('/api/task/delete', 'DELETE', { id:id }, {
                Authorization: `Bearer ${token}`
            });

            // dispatch(removeCurrentUserTaskAction(id));
        } catch (e) {}
    }, [token,request]);

    // const handleDeleteTask = (id) => {
    //     console.log(id);
    //     dispatch(removeTaskAction(id));    Здесь нужно будет логика по удалению записи по id из MongoDB
    // }

    return (
        <>
            <li className="task__item" >
                <span className="item__leftsidecontent">
                    <CheckSquareOutlined className="item__check"  onClick={ () => setDoneItem(prevState => !prevState) } />
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