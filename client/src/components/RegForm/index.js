import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
// import { useHistory } from 'react-router-dom';
// import {useMessage} from "../../hooks/message.hook";
import {useDispatch} from 'react-redux';

import './RegForm.scss';

const RegForm = ({ modalTitle }) => {
    // const history = useHistory();
    const dispatch = useDispatch();
    // const message = useMessage();
    const { request,error,clearError,loading } = useHttp();
    const [form, setForm] = useState({
        email:'',password:'',name:''
    });

    const handleClickAuth = () => { dispatch({type:'TOGLLER_FOR_CHANGE_AUTHFORM'}) };

    const onChangeRegFormHandler = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const fetchRegister = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('After registration process',data);
            // message(data.message);
        } catch (e) {}
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        fetchRegister();
    }

    const handlePressEnter = async event => {
        if (event.key === 'Enter') {
            await fetchRegister();
            // history.push('/');
        }
    }

    useEffect(() => {
        // message(error);
        clearError();
        return () => {                                               // Решение проблемы:
            setForm({ email:'',password: '',name:'' });                 // https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
        };                                                           //
    // },[error,message,clearError]);
    },[error,clearError]);

    return (
        <div className="regform">
            <div className="regform__form-header form-header">
                <h1><strong>{modalTitle}</strong></h1>
            </div>
            <form action="#" onSubmit={registerHandler} className="regform__form-content form-content">
                <div className="form-content__reg-email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name='email'
                        value={form.email}
                        id="email"
                        placeholder="Введите ваш email"
                        onChange={onChangeRegFormHandler}
                    />
                </div>
                <div className="form-content__reg-name">
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        name='name'
                        value={form.name}
                        id="name"
                        placeholder="Как Вас зовут?"
                        onChange={onChangeRegFormHandler}
                        // onKeyPress={handlePressEnter}
                    />
                </div>
                <div className="form-content__reg-password">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        name='password'
                        value={form.password}
                        id="password"
                        placeholder="Придумайте пароль"
                        onChange={onChangeRegFormHandler}
                        onKeyPress={handlePressEnter}
                    />
                </div>
                <div className="form-content__btn-reg">
                    <button
                        type="submit"
                        className="btn-reg"
                        disabled={loading}
                        onClick={registerHandler}
                    >
                        Регистрация
                    </button>
                </div>
            </form>
            <div className="regform__change-to-login">
                Have an account?&nbsp;
                <button
                    className="btn-to-login"
                    disabled={loading}
                    onClick={handleClickAuth}
                >
                    Sign in
                </button>
            </div>
        </div>
    );
};

export default RegForm;