import React, {useEffect, useState} from 'react';

import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {useAuth} from "../../hooks/auth.hook";

import {setAuthDataAction} from "../../store/dataAuthReducer";

import './LoginForm.scss';


const LoginForm = ({modalTitle}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {login} = useAuth();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });


    const onChangeFormHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleClickRegister = () => {
        dispatch({type: 'TOGLLER_FOR_CHANGE_AUTHFORM'});
    };


    useEffect(() => {
        clearError();
        return () => {
            setForm({email: '', password: ''});
        };
    }, [error, clearError]);

    const fetchAuthorization = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});

            console.log('data.token is: ', data.token);
            console.log('data.userId is: ', data.userId);

            dispatch(setAuthDataAction({
                token: data.token,
                userId: data.userId
            }));

            login(data.token, data.userId, data.email, data.name);
        } catch (e) {
        }
    }

    const loginHandler = async (event) => {
        event.preventDefault();
        await fetchAuthorization();
        history.push('/');
    }

    const handlePressEnter = async event => {
        if (event.key === 'Enter') {
            await fetchAuthorization();
            history.push('/');
        }
    }

    return (
        <>
            <div className="login">
                <h1 className="login__header header-modal">
                    <strong>{modalTitle}</strong>
                </h1>
                <div className="login__body body-modal">
                    <form
                        action="#"
                        onSubmit={loginHandler}
                        className="login__loginform form-modal"
                    >
                        <div className="loginform__email email">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name='email'
                                value={form.email}
                                id="email"
                                placeholder="Введите ваш email"
                                onChange={onChangeFormHandler}
                            />
                        </div>
                        <div className="loginform__password password">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                name='password'
                                value={form.password}
                                id="password"
                                placeholder="Введите пароль"
                                onChange={onChangeFormHandler}
                                onKeyPress={handlePressEnter}
                            />
                        </div>
                        <div className="loginform__buttons form-buttons">
                            <div className="loginform__button">
                                <button
                                    type="submit"
                                    className="button-auth button-submit-form"
                                    disabled={loading}
                                    onClick={loginHandler}
                                >
                                    Auth
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="login__change change-form">
                        <div className="change-form__text">
                            New user?
                        </div>
                        <div className="change-form__buttons">
                            <button
                                className="change-form__button"
                                disabled={loading}
                                onClick={handleClickRegister}
                            >
                                Create an account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*</div>*/}
        </>
    );
};

export default LoginForm;