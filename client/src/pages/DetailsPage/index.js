import React, {useState, useCallback, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";

import GridLayout from "../../components/GridLayout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import TaskCardDescription from "../../components/TaskCardDescription";

import './DetailsPage.scss';


const DetailsPage = () => {
    const history = useHistory();
    const {request, loading, ready} = useHttp();
    const [task, setTask] = useState(null);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData.token;
    const userIdOwner = useParams().id;


    const getTask = useCallback(async () => {
        try {
            const data = await request(`/api/task/${userIdOwner}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            setTask(data);
        } catch (e) {
        }
    }, [token, userIdOwner, request])

    useEffect(() => {
        getTask();
    }, [getTask]);

    if (!ready) {
        return (
            <GridLayout>
                <Header/>
                <Loader alignItems="center"/>
                <Footer/>
            </GridLayout>
        );
    }

    const handleClickReturn = () => {
        history.push('/');
    }

    return (
        <GridLayout>
            <Header/>
            <div className="task-details">
                <h1 className="task-details__page-title">Подробнее о задаче</h1>
                <TaskCardDescription  task={task} userIdOwner={userIdOwner} />
                <div className="task-details__button-return-to-home button-return-to-home">
                    <button
                        onClick={handleClickReturn}
                        className="button-return-to-home"
                    >
                        Вернуться
                    </button>
                </div>
            </div>
            <Footer/>
        </GridLayout>
    );
};

export default DetailsPage;