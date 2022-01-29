import React from 'react';
import {useSelector} from 'react-redux';

import GridLayout from "../../components/GridLayout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Modal from '../../components/Modal';
import LoginForm from "../../components/LoginForm";
import RegForm from "../../components/RegForm";

const AuthPage = () => {
    const loginFormStateModal = useSelector( state => state.modalStateReducer.loginFormState );

    return (
        <>
            <GridLayout>
                <Header />
                <div>
                    <Modal
                        isOpen={true}
                    >
                        {
                            loginFormStateModal ?
                                (<LoginForm modalTitle='Auth' />)
                                :
                                (<RegForm modalTitle='Registration' />)
                        }
                    </Modal>
                </div>
                <Footer />
            </GridLayout>
        </>
    );
};

export default AuthPage;