import React from 'react';
import {useHttp} from "../../hooks/http.hook";

import './TaskCardDescription.scss';

const TaskCardDescription = ({ task,userIdOwner }) => {
    const {loading} = useHttp();

    return (
        <div className="task-details__body">
            {/*{ !loading && task && 'Здесь jsx код или компонент TaskCardDescription(условно) для вывода полного описания таска.И кидаем в него аргумент task для дальнейшем обработки для вывода информации по таску' }*/}
            {!loading && task && (
                <>
                    <div><strong>userId:</strong> {userIdOwner}</div>
                    <div><strong>TaskId:</strong> {task.id}</div>
                    <div  className="task-details__title">
                        <strong>Тема:</strong>
                        {task.title ? `${task.title}` : <strong>Без темы</strong>}
                    </div>
                    <div  className="task-details__text">
                        <strong>Описание задачи:</strong>
                        {`${task.text}`}
                    </div>
                    <div className="task-details__time">
                        <strong>Создано:</strong> {`${task.time}`}
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskCardDescription;