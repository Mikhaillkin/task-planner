import React, {useEffect, useState} from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useAuth} from "../../hooks/auth.hook";

import './LoginForm.scss';

const LoginForm = ({ modalTitle }) => {
    const history = useHistory();
    const message = useMessage();
    const { login } = useAuth();
    const { loading,error,request,clearError } = useHttp();
    const [form,setForm] = useState({
        email:'',password: ''
    });

    const onChangeFormHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const dispatch = useDispatch();
    const handleClickReg = () => { dispatch({type:'TOGLLER_FOR_CHANGE_AUTHFORM'}) };


    useEffect(() => {
        message(error);
        clearError();
        return () => {                                               // Решение проблемы:
            setForm({ email:'',password: '' });                 // https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
        };                                                           //
    },[error,message,clearError]);

    const fetchAuthorization = async () => {
        try {
            const data = await request('/api/auth/login','POST', {...form});
            login(data.token, data.userId);
        } catch (e) {}
    }

    const handleAuthUser = async (event) => {
        event.preventDefault();
        await fetchAuthorization();
        history.push('/');
    }

    const handlePress = async event => {
        if(event.key === 'Enter') {
            await fetchAuthorization();
            history.push('/');
        }
    }

    return (
        <>
            <div className="loginform__header">
                <h1><strong>{ modalTitle }</strong></h1>
            </div>
            <div className="loginform-content">
                <form action="#" onSubmit={handleAuthUser} >
                    <div className="loginform-form">
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
                    <div className="loginform-form">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            name='password'
                            value={form.password}
                            id="password"
                            placeholder="Введите пароль"
                            onChange={onChangeFormHandler}
                            onKeyPress={handlePress}
                        />
                    </div>
                    <div className="loginform__btns">
                        <button
                            type="submit"
                            className="btn-auth reg-btn"
                            onClick={handleClickReg}
                        >
                            Регистрация
                        </button>
                        <button
                            type="submit"
                            className="btn-auth"
                            disabled={loading}
                            onClick={handleAuthUser}
                        >
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;