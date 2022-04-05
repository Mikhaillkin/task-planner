import React, {useEffect, useState} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {NotificationManager} from 'react-notifications';
import {useDispatch} from 'react-redux';




const RegForm = ({ modalTitle }) => {
    const dispatch = useDispatch();
    const { request,error,clearError,loading } = useHttp();
    const [form, setForm] = useState({
        email:'',password:'',name:''
    });

    const handleClickAuth = () => {
        dispatch({type: 'TOGLLER_FOR_CHANGE_AUTHFORM'});
    };

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
        <>
            <div className="reg">
                <h1 className="reg__header header-modal">
                    <strong>{modalTitle}</strong>
                </h1>
                <div className="reg__body body-modal">
                    <form
                        action="#"
                        onSubmit={registerHandler}
                        className="reg__regform form-modal"
                    >
                        <div className="regform__email email">
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
                        <div className="regform__name name">
                            <label htmlFor="name">Имя</label>
                            <input
                                type="text"
                                name='name'
                                value={form.name}
                                id="name"
                                // placeholder="Как Вас зовут?"
                                placeholder="Your Name"
                                onChange={onChangeRegFormHandler}
                                // onKeyPress={handlePressEnter}
                            />
                        </div>
                        <div className="regform__password password">
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                name='password'
                                value={form.password}
                                id="password"
                                placeholder="Введите пароль"
                                onChange={onChangeRegFormHandler}
                                onKeyPress={handlePressEnter}
                            />
                        </div>
                        <div className="regform__buttons form-buttons">
                            <div className="regform__button">
                                <button
                                    type="submit"
                                    className="button-reg button-submit-form"
                                    disabled={loading}
                                    onClick={registerHandler}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="reg__change change-form">
                        <div className="change-form__text">
                            Have an account?
                        </div>
                        <div className="change-form__buttons">
                            <button
                                className="change-form__button"
                                disabled={loading}
                                onClick={handleClickAuth}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegForm;