import React, {useCallback, useState} from 'react';
import {useHistory} from "react-router-dom";

import GridLayout from "../../components/GridLayout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CreateTask from "../../components/CreateTask";

import './CreatePage.scss';


const CreatePage = () => {
    const history = useHistory();


    return (
        <>
            <GridLayout>
                <Header/>
                <div className="create-page">
                    <div className="create-page__page-title page-title" >
                        <h1><strong>Create Task</strong></h1>
                    </div>
                    <CreateTask />
                    <div className="create-page__btn-return-to-home">
                        <button
                            onClick={ () => history.push('/') }
                            className="btn-return-to-home"
                        >
                            Вернуться
                        </button>
                    </div>
                </div>
                <Footer/>
            </GridLayout>
        </>
    );
};

export default CreatePage;