import React from 'react';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Exit from "../../components/Exit";

import './SettingsPage.scss';

const SettingsPage = () => {
    return (
        <>
            <Header />
            <section className="page__settings settings">
                <div className="settings__container _container">
                    <div className="settings__body">
                        <h1 className="settings__header header-block">Settings</h1>
                        <div className="settings__list">
                            <div className="settings__text">
                                К сожалению,на данный момент для Вас нет доступных настроек.<br />
                                Прямо сейчас проводятся технические работы.Благодарим за понимание.
                            </div>
                            <div className="settings__exit">
                                <Exit />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default SettingsPage;