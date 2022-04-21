import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from "../../hooks/auth.hook";

import userPhotoPng from './images/user-photo-png.png';
import {MENU} from '../../data/headerMenu.js';

import {MenuOutlined,CloseOutlined} from '@ant-design/icons';
import cn from 'classnames';
import './Header.scss';


const Header = () => {
    const history = useHistory();
    const { logout } = useAuth();
    const [menuBurgerIsActive,setMenuBurgerActive] = useState(false);


    return (
        <>
            <header className="header">
                <div className="header__container _container-header">
                    <div className="header__body">
                        <div
                            onClick={() => setMenuBurgerActive(prevState => !prevState)}
                            className="header__menu-burger"
                        >
                            {
                                menuBurgerIsActive ?
                                    <>
                                        <CloseOutlined
                                            className="close-menu-burger__icon"
                                        />
                                    </>
                                    :
                                    <>
                                        <MenuOutlined
                                            className="menu-burger__icon"
                                            onClick={() => console.log('Menu Burger Clicked')}
                                        />
                                    </>
                            }
                        </div>
                        <div
                            onClick={() => history.push(`/profile`)}
                            className="header__user-photo"
                        >
                            <img src={userPhotoPng} alt="User photo"/>
                        </div>
                    </div>
                </div>
            </header>
            <header className={cn(
                "header__menu-burger-active",
                {"active": menuBurgerIsActive}
            )}>
                <nav className="header__menu menu">
                    <ul className="menu__list">
                        {
                            MENU.map(({title, to},index) => {
                                return (
                                    <li key={index} className="menu__item">
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if(title === 'Logout') {
                                                    logout();
                                                }
                                                setMenuBurgerActive(prevState => !prevState);
                                                history.push(`${to}`);

                                            }}
                                            className="menu__link"
                                        >
                                            <p>{title}</p>
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;