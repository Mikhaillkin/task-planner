import React, {useState, useCallback, useEffect} from 'react';
import {useHistory,Link} from 'react-router-dom';
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
                        {/*<div className="header-wrap-top">*/}
                        {/*    /!*<div className="header__username">*!/*/}
                        {/*    /!*    Welcome, { name }*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    /!*<div*!/*/}
                        {/*    /!*    className="header__exit exit"*!/*/}
                        {/*    /!*    onClick={ () => history.push('/auth') }*!/*/}
                        {/*    /!*>*!/*/}
                        {/*    /!*    <div*!/*/}
                        {/*    /!*        className="exit__icon"*!/*/}
                        {/*    /!*    >*!/*/}
                        {/*    /!*        <svg viewBox="64 64 896 896" focusable="false" data-icon="logout" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true"><path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"></path></svg>*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*    <div className="exit__link">*!/*/}
                        {/*    /!*        <Exit />*!/*/}
                        {/*    /!*    </div>*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*</div>*/}
                        {/*<hr/>*/}
                        {/*<div className="header-wrap-bottom">*/}
                        {/*    <div className="_container__menu">*/}
                        {/*        <div className="header__menu menu">*/}
                        {/*            <ul className="menu__list">*/}
                        {/*                <li*/}
                        {/*                    className="menu__item"*/}
                        {/*                    onClick={() => history.push(`/`)}*/}
                        {/*                >*/}
                        {/*                    <a*/}
                        {/*                        onClick={() => history.push(`/`)}*/}
                        {/*                        href=""*/}
                        {/*                        className="menu__link"*/}
                        {/*                    >*/}
                        {/*                        Main Page*/}
                        {/*                    </a>*/}
                        {/*                </li>*/}
                        {/*                <li className="menu__item">*/}
                        {/*                    <a href="" className="menu__link menu__link_profile">Profile</a>*/}
                        {/*                </li>*/}
                        {/*                <li*/}
                        {/*                    onClick={() => history.push(`/profile`)}*/}
                        {/*                    className="menu__item"*/}
                        {/*                >*/}
                        {/*                    <a href="" className="menu__link">Tasks Groups</a>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </header>
            <header className={cn(
                "header__menu-burger-active",
                {"active": menuBurgerIsActive}
            )}>
                <nav className="header__menu menu">
                    <ul className="menu__list">
                        {/*<li className="menu__item">*/}
                        {/*    <a href="" className="menu__link">Main</a>*/}
                        {/*</li>*/}
                        {/*<li className="menu__item">*/}
                        {/*    <a href="" className="menu__link">Profile</a>*/}
                        {/*</li>*/}
                        {/*<li className="menu__item">*/}
                        {/*    <a href="" className="menu__link">Settings</a>*/}
                        {/*</li>*/}
                        {/*<li className="menu__item">*/}
                        {/*    <a href="" className="menu__link">Logout</a>*/}
                        {/*</li>*/}
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