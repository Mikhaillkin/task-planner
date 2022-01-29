import React,{useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useAuth} from "../../hooks/auth.hook";
import {useHistory} from "react-router-dom";
// import { useSelector,useDispatch } from 'react-redux';

import GridLayout from "../../components/GridLayout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {SendOutlined} from "@ant-design/icons";
import './CreatePage.scss';
// import {addCurrentUserTaskAction} from "../../store/tasksReducer";

const CreatePage = () => {
    // const dispatch = useDispatch();
    const [addFormTitle,setAddFormTitle] = useState('');
    const [addFormText,setAddFormText] = useState('');
    const { request } = useHttp();
    const { token } = useAuth();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const history = useHistory();

    function createDate () {
        var time = new Date();
        var hours = time.getHours().toString();
        var minutes = time.getMinutes().toString();

        var day = time.getDate().toString();
        var month = (time.getMonth() + 1 ).toString();
        var year = time.getFullYear();

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
            },{
                Authorization: `Bearer ${userData.token}`
            });

            console.log(data);
            history.push('/');

        } catch (e) {}
    }

    const pressHandler = async (event) => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/task/create', 'POST', {
                    title: addFormTitle,
                    text: addFormText,
                    time: createDate()
                },{
                    Authorization: `Bearer ${userData.token}`
                });

                // dispatch(addCurrentUserTaskAction(data));

                console.log(data);
            } catch (e) {}
            history.push('/');
        }
    }

    return (
        <>
            <GridLayout>
                <Header />
                <div>
                    <div className="taskadd-content">
                        <div className="title-createpage">
                            <h1><strong>Create Task</strong></h1>
                        </div>
                        <form onSubmit={createTask}>
                            <div className="taskadd-form">
                                <label htmlFor="title">Тема:</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={addFormTitle}
                                    placeholder="Введите тему задачи..."
                                    onChange={(e) => setAddFormTitle(e.target.value)}
                                />
                            </div>
                            <div className="taskadd-form">
                                <label htmlFor="description">Описание задачи:</label>
                                <textarea
                                    id="task-description"
                                    cols="30"
                                    rows="10"
                                    placeholder="Напишите задачу..."
                                    value={addFormText}
                                    onChange={(e) => setAddFormText(e.target.value)}
                                    onKeyPress={pressHandler}
                                />
                            </div>
                            <div className="taskadd-form__btn-add">
                                <button
                                    type="submit"
                                    className="btn-add"
                                >
                                    Добавить<SendOutlined />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </GridLayout>
        </>
    );
};

export default CreatePage;