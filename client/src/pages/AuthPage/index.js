import React from 'react';
import {useSelector} from 'react-redux';

import Layout from "../../components/Layout";
import Modal from '../../components/Modal';
import LoginForm from "../../components/LoginForm";
import RegForm from "../../components/RegForm";

const AuthPage = () => {
    const loginFormStateModal = useSelector( state => state.modalStateReducer.loginFormState );

    return (
        <>
            <Layout>
                <div className="page__auth">
                    <Modal
                        isOpen={true}
                    >
                        {
                            loginFormStateModal ?
                                (<LoginForm modalTitle='Sign In' />)
                                :
                                (<RegForm modalTitle='Sign Up' />)
                        }
                    </Modal>
                </div>
            </Layout>
        </>
    );
};

export default AuthPage;