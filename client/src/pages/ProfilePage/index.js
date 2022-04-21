import React, {useState, useEffect, useCallback} from 'react';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import './ProfilePage.scss';
import Exit from "../../components/Exit";
import {useHttp} from "../../hooks/http.hook";

const ProfilePage = () => {
    const { request } = useHttp()
    const [name,setName] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData?.token;


    const getUserName = useCallback( async () => {
        try {
            const userName = await request('/api/auth/getUserName', 'GET',null,{
                Authorization: `Bearer ${token}`
            });

            console.log('userName: ',userName);


            setName(userName);
        }
        catch (e) {}
    } ,[token,request]);

    useEffect(() => {
        userData && getUserName();
    },[getUserName])

    return (
        <>
            <Header/>
            <section className="page__profile profile">
                <div className="profile__container _container">
                    <div className="profile__body">
                        <header className="profile__header header-block">Profile</header>
                        <div className="user__info">
                            <div className="profile__username">
                                Пользователь: { name }
                            </div>
                            <div
                                className="profile__exit"
                            >
                                <Exit />
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default ProfilePage;