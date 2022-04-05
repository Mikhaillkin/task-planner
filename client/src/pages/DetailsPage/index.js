import React, {useState, useCallback, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import TaskCardDescription from "../../components/TaskCardDescription";

import './DetailsPage.scss';


const DetailsPage = () => {
    const history = useHistory();
    const {request, ready} = useHttp();
    const [task, setTask] = useState(null);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData?.token;
    const userIdOwner = useParams().id;


    const getTask = useCallback(async () => {
        try {
            const data = await request(`/api/task/${userIdOwner}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });

            setTask(data);
        } catch (e) {
        }
    }, [token, userIdOwner, request]);

    useEffect(() => {
        getTask();
    }, [getTask]);

    if (!ready) {
        return (
            <>
                <Header/>
                <section className="page__task-details task-details">
                    <div className="task-details__container _container">
                        <div className="task-details__body">
                            <div className="task-details__body_wrap">
                                <h1 className="task-details__header header-block">
                                    Подробнее о задаче
                                </h1>
                                <div className="task-details__full-descr" >
                                    <div className="task-details__task-card-descr">
                                        <Loader alignItems="center"/>
                                    </div>
                                </div>
                            </div>
                            <div className="task-details__buttons">
                                <button
                                    onClick={ () => history.push('/') }
                                    className="task-details__button task-details__button_return"
                                >
                                    Вернуться
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </>
        );
    }


    return (
        <>
            <Header />
            <section className="page__task-details task-details">
                <div className="task-details__container _container">
                    <div className="task-details__body">
                        <div className="task-details__body_wrap">
                            <h1 className="task-details__header header-block">
                                Подробнее о задаче
                            </h1>
                            <div className="task-details__full-descr full-descr" >
                                <TaskCardDescription  task={task} userIdOwner={userIdOwner} />
                            </div>
                        </div>
                        <div className="task-details__buttons">
                            <button
                                onClick={ () => history.push('/') }
                                className="task-details__button task-details__button_return"
                            >
                                Вернуться
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default DetailsPage;