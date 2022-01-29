import React from 'react';

import {useHistory} from 'react-router-dom';

import GridLayout from "../../components/GridLayout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TasksList from "../../components/TasksList";

import './HomePage.scss';

const HomePage = () => {
    const history = useHistory();

    return (
        <>
            <GridLayout>
                <Header />
                <div className="home">
                    <section className="content">
                            <h1 className="content__title">Мои задачи</h1>
                            <div className="content__tasks tasks">
                                <div className="tasks__add" onClick={() => history.push('/create')}>
                                    <ion-icon name="add-circle"></ion-icon>
                                </div>
                                <TasksList />
                            </div>
                    </section>
                </div>
                <Footer />
            </GridLayout>
        </>
    );
};

export default HomePage;