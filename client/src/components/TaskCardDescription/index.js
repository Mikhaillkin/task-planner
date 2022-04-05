import React from 'react';
import {useHttp} from "../../hooks/http.hook";

import './TaskCardDescription.scss';

const TaskCardDescription = ({ task,userIdOwner }) => {
    const {loading} = useHttp();

    return (
        <>
            {!loading && task && (
                <div className="full-descr__body body-fulldescr">
                    <div className="body-fulldescr__id">
                        <div className="body-fulldescr__id_userid">
                            <strong>UserId:</strong> {userIdOwner}
                        </div>
                        <div className="body-fulldescr__id_taskid">
                            <strong>TaskId:</strong> {task.id}
                        </div>
                    </div>
                    <div className="body-fulldescr__title">
                        <strong>Тема:</strong> {task.title ? `${task.title}` : <strong>Без темы</strong>}
                    </div>
                    <div className="body-fulldescr__text">
                        <strong>Описание задачи:</strong><br/>
                        {`${task.text}`}
                    </div>
                    <div className="body-fulldescr__time">
                        <strong>Создано:</strong> {`${task.time}`}
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskCardDescription;