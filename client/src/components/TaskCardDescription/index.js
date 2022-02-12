import React from 'react';
import {useHttp} from "../../hooks/http.hook";

import './TaskCardDescription.scss';

const TaskCardDescription = ({ task,userIdOwner }) => {
    const {loading} = useHttp();

    return (
        <div className="task-card-descr">
            {!loading && task && (
                <div className="task-card-descr__body-descr body-descr">
                    <div className="wrap-id" >
                        <div
                            className="body-descr__element body-descr__element_userid"
                        >
                            <strong>UserId:</strong> {userIdOwner}
                        </div>
                        <div
                            className="body-descr__element body-descr__element_taskid"
                        >
                            <strong>TaskId:</strong> {task.id}
                        </div>
                    </div>
                    <div className="wrap-body">
                        <div
                            className="body-descr__element body-descr__element_title"
                        >
                            <strong>Тема:</strong> {task.title ? `${task.title}` : <strong>Без темы</strong>}
                        </div>
                        <div className="body-descr__element body-descr__element_text" >
                            <strong>Описание задачи:</strong>
                            <div>{`${task.text}`}</div>
                        </div>
                    </div>
                    <div className="wrap-time">
                        <div
                            className="body-descr__element body-descr__element_time"
                        >
                            <strong>Создано:</strong> {`${task.time}`}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskCardDescription;