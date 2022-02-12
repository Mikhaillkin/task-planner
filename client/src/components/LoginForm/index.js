import React, {useEffect, useState} from 'react';

import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useAuth} from "../../hooks/auth.hook";

import './LoginForm.scss';

const LoginForm = ({modalTitle}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const message = useMessage();
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
        message(error);
        clearError();
        return () => {
            setForm({email: '', password: ''});
        };
    }, [error, message, clearError]);

    const fetchAuthorization = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            login(data.token, data.userId, data.email,data.name);
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
        <div className="loginform">
            <div className="loginform__form-header form-header">
                <h1><strong>{modalTitle}</strong></h1>
            </div>
            <form action="#" onSubmit={loginHandler} className="loginform__form-content form-content">
                <div className="form-content__login-email">
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
                <div className="form-content__login-password">
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
                <div className="form-content__btn-auth">
                    <button
                        type="submit"
                        className="btn-auth"
                        disabled={loading}
                        onClick={loginHandler}
                    >
                        Войти
                    </button>
                </div>
            </form>
            <div className="loginform__change-to-register">
                New user?&nbsp;
                <button
                    className="btn-to-register"
                    disabled={loading}
                    onClick={handleClickRegister}
                >
                    Create an account
                </button>
            </div>
        </div>
    );
};

export default LoginForm;