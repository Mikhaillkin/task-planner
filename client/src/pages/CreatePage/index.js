import React from 'react';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateTask from "../../components/CreateTask";

import './CreatePage.scss';


const CreatePage = () => {

    return (
        <>
            <Header />
            <section className="page__create-page create-page">
                <div className="create-page__container _container">
                    <div className="create-page__body">
                        <h1 className="create-page__header header-block">
                            Create Task
                        </h1>
                        <CreateTask />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default CreatePage;