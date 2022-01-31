import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useDispatch} from 'react-redux';

import './RegForm.scss';

const RegForm = ({ modalTitle }) => {
    const dispatch = useDispatch();
    // const message = useMessage();
    const { request,error,clearError,loading } = useHttp();
    const [form, setForm] = useState({
        email:'',password:''
    });

    const handleClickReg = () => { dispatch({type:'TOGLLER_FOR_CHANGE_AUTHFORM'}) };

    const OnChangeLoginFormHandler = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('After registration process',data);
            // message(data.message);
        } catch (e) {}
    }

    useEffect(() => {
        // message(error);
        clearError();
        return () => {                                               // Решение проблемы:
            setForm({ email:'',password: '' });                 // https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
        };                                                           //
    // },[error,message,clearError]);
    },[error,clearError]);

    return (
        <>
            <div className="regform__header">
                <h1><strong>{ modalTitle }</strong></h1>
            </div>
            <div className="regform-content">
                <form onSubmit={registerHandler}>
                    <div className="regform-form">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            id="email"
                            placeholder="Введите ваш email"
                            onChange={OnChangeLoginFormHandler}
                        />
                    </div>
                    <div className="regform-form">
                        <label htmlFor="password">Пароль</label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            placeholder="Введите пароль"
                            onChange={OnChangeLoginFormHandler}
                        />
                    </div>
                    <div className="regform__btns">
                        <button
                            type="submit"
                            className="btn-auth"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </form>
                <button
                    className="btn-auth reg-btn"
                    onClick={handleClickReg}
                >
                    Войти
                </button>
            </div>
        </>
    );
};

export default RegForm;