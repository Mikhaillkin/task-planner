import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../hooks/auth.hook";

import {MenuOutlined} from "@ant-design/icons";

import './Header.scss';


const Header = () => {
    const history = useHistory();
    const { logout } = useAuth();
    const userData = JSON.parse(localStorage.getItem('userData'));

    const handleLogout = () => {
        // e.preventDefault();
        logout();
    }

    return (
        <div className="header">
            {/*<div className="header__burger">*/}
            {/*    <MenuOutlined className="burger" />*/}
            {/*</div>*/}
            <div className="header__exit">
                {
                    userData && userData.token ?
                        (<a
                            className="logout"
                            onClick={() => {
                                handleLogout();
                                history.push('/auth');
                            }
                            }
                        >
                            Выйти
                        </a>)
                        :
                        null
                }
            </div>
        </div>
    );
};

export default Header;