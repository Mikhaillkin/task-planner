import React from 'react';

import {useHistory} from 'react-router-dom';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TasksList from "../../components/TasksList";

import {PlusCircleOutlined} from '@ant-design/icons';
import './HomePage.scss';

const HomePage = () => {
    const history = useHistory();

    return (
        <>
            <Header/>
            <section className="page__home home">
                <div className="home__container _container">
                    <div className="home__body">
                        <h1 className="home__header header-block">All Tasks</h1>
                        <div
                            className="home__add-circle-btn add-circle-btn"
                            onClick={() => history.push('/create')}
                        >
                            <PlusCircleOutlined className="add-circle"/>
                        </div>
                        <TasksList/>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default HomePage;