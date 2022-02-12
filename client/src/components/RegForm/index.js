import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {NotificationManager} from 'react-notifications';
import {useDispatch} from 'react-redux';
import {changeAuthFormModalAction} from "../../store/modalStateReducer";


import './RegForm.scss';



const RegForm = ({ modalTitle }) => {
    const dispatch = useDispatch();
    const { request,error,clearError,loading } = useHttp();
    const [form, setForm] = useState({
        email:'',password:'',name:''
    });

    const handleClickAuth = () => { dispatch(changeAuthFormModalAction) };

    const onChangeRegFormHandler = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const fetchRegister = async () => {
        try {
            let regResponse = null;
            regResponse = await request('/api/auth/register', 'POST', {...form});
            console.log('After registration process',regResponse);

            setTimeout(() => {
                document.location.reload();
            },2000);


            NotificationManager.success('Success registration');


        } catch (e) {}
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        fetchRegister();
    }

    const handlePressEnter = async event => {
        if (event.key === 'Enter') {
            await fetchRegister();
        }
    }

    useEffect(() => {
        clearError();
        return () => {
            setForm({ email:'',password: '',name:'' });
        };
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