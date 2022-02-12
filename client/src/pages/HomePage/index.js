import React from 'react';

import {useHistory} from 'react-router-dom';

import GridLayout from "../../components/GridLayout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TasksList from "../../components/TasksList";

import { PlusCircleOutlined } from '@ant-design/icons';
import './HomePage.scss';

const HomePage = () => {
    const history = useHistory();

    return (
        <>
            <GridLayout>
                <Header />
                <div className="home">
                    <div className="home__page-title page-title" >
                        <h1><strong>Мои задачи</strong></h1>
                    </div>
                    <div className="home__add-circle-btn add-circle-btn" onClick={() => history.push('/create')}>
                        <PlusCircleOutlined className="add-circle" />
                    </div>
                    <TasksList />
                </div>
                <Footer />
            </GridLayout>
        </>
    );
};

export default HomePage;