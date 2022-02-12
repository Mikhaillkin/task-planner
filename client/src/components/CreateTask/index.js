import React, {useState,useCallback} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useHistory} from "react-router-dom";

import {SendOutlined} from "@ant-design/icons";

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
        <div className="create-task">
            <form onSubmit={createTask} className="create-task__taskadd-form-group taskadd-form-group">
                <div className="taskadd-form-group__create-title create-title">
                    <label
                        htmlFor="create-title"
                    >
                        Тема:
                    </label>
                    <input
                        type="text"
                        id="create-title"
                        value={addFormTitle}
                        placeholder="Введите тему(необязательно)"
                        onChange={(e) => setAddFormTitle(e.target.value)}
                    />
                </div>
                <div className="taskadd-form-group__create-text create-text">
                    <label
                        htmlFor="create-text"
                    >
                        Описание задачи:
                    </label>
                    <textarea
                        id="create-text"
                        cols="30"
                        rows="10"
                        placeholder="Напишите задачу..."
                        value={addFormText}
                        onChange={(e) => setAddFormText(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                </div>
                <div className="taskadd-form-group__btn-create-task btn-create-task">
                    <button
                        type="submit"
                        className="btn-create-task"
                    >
                        Добавить<SendOutlined/>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;