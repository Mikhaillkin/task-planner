import React, {useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from "react-router-dom";

import './CreateTask.scss';

const CreateTask = () => {
    const [addFormTitle, setAddFormTitle] = useState('');
    const [addFormText, setAddFormText] = useState('');
    const {request} = useHttp();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const history = useHistory();


    function createDate() {
        let time = new Date();
        let hours = time.getHours().toString();
        let minutes = time.getMinutes().toString();

        let day = time.getDate().toString();
        let month = (time.getMonth() + 1).toString();
        let year = time.getFullYear();

        if (hours.length < 2) {
            hours = '0' + hours;
        }

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        if (month.length < 2) {
            month = '0' + month;
        }

        return `${day}/${month}/${year} в ${hours}:${minutes}`;

    }

    const createTask = async (event) => {
        event.preventDefault();
        try {
            const data = await request('/api/task/create', 'POST', {
                title: addFormTitle,
                text: addFormText,
                time: createDate()
            }, {
                Authorization: `Bearer ${userData.token}`
            });

            console.log(data);
            history.push('/');

        } catch (e) {
        }
    }

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/task/create', 'POST', {
                    title: addFormTitle,
                    text: addFormText,
                    time: createDate()
                }, {
                    Authorization: `Bearer ${userData.token}`
                });

                console.log(data);
            } catch (e) {
            }
            history.push('/');
        }
    }

    return (
        <>
            <form onSubmit={createTask} action="#" className="create-page__form form-createtask">
                <div className="form-createtask__body body-createtask">
                    <div className="body-createtask__title title-createtask">
                        <div className="title-createtask__label">
                            <label
                                // htmlFor="create-title"
                            >
                                Тема
                            </label>
                        </div>
                        <div className="title-createtask__input">
                            <input
                                type="text"
                                // id="create-title"
                                value={addFormTitle}
                                placeholder="Заголовок"
                                onChange={(e) => setAddFormTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="body-createtask__descr descr-createtask">
                        <div className="descr-createtask__label">
                            <label
                                // htmlFor="create-text"
                            >
                                Описание задачи
                            </label>
                        </div>
                        <div className="descr-createtask__textarea">
                            <textarea
                                // id="create-text"
                                cols="30"
                                rows="10"
                                placeholder="Напишите задачу"
                                value={addFormText}
                                onChange={(e) => setAddFormText(e.target.value)}
                                onKeyPress={pressHandler}
                            />
                        </div>
                    </div>
                    <div className="body-createtask__buttons">
                        <div>
                            <button
                                type="submit"
                                className="body-createtask__button body-createtask__button_createtask"
                            >
                                Добавить
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={ () => history.push('/') }
                                className="task-details__button task-details__button_return"
                            >
                                Вернуться на Главную
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CreateTask;