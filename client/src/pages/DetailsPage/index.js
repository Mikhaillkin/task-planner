import React, {useState, useCallback, useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {useHttp} from "../../hooks/http.hook";

import GridLayout from "../../components/GridLayout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";



const DetailsPage = () => {
    const history = useHistory();
    const {request, loading,ready} = useHttp();
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
        // return <Spin indicator={antIcon}/>;  //Определи компонент лоадер и вызови его в return здесь
        return (
            <GridLayout>
                <Header/>
                <Loader alignItems="center" />
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
            <div className="task-details" style={{ display: 'flex',justifyContent: 'center',paddingTop: '2rem' }}>
                <section className="content">
                    <h1 style={{fontSize: '34px', fontWeight: '900'}}>Подробнее о задаче</h1>
                    <div>
                        {/*{ !loading && task && 'Здесь jsx код или компонент TaskCardDescription(условно) для вывода полного описания таска.И кидаем в него аргумент task для дальнейшем обработки для вывода информации по таску' }*/}
                        {!loading && task && (
                            <>
                                <div><strong>userId:</strong> {userIdOwner}</div>
                                <div><strong>TaskId:</strong> {task.id}</div>
                                <div style={{marginTop: '10px'}}>
                                    <strong>Тема:</strong>
                                    <div>
                                        {task.title ? `${task.title}` : <strong>Без темы</strong>}
                                    </div>
                                </div>
                                <div style={{marginTop: '30px'}}>
                                    <strong>Описание задачи:</strong>
                                    <div>
                                        {`${task.text}`}
                                    </div>
                                    <div style={{marginTop: '30px'}}>
                                        <strong>Создано:</strong> {`${task.time}`}
                                    </div>
                                </div>
                                <div className="btn-return" style={{marginTop: '5rem'}}>
                                    <button onClick={handleClickReturn} style={{padding: '15px', fontSize: '14px'}}>
                                        Вернуться
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
            <Footer/>
        </GridLayout>
    );
};

export default DetailsPage;