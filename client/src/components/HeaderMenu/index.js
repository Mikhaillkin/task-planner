import React from 'react';
import {useHistory} from 'react-router-dom';

import {MENU} from "../../data/headerMenu";
import {useAuth} from "../../hooks/auth.hook";

import cn from "classnames";
import './HeaderMenu.scss';



const HeaderMenu = ({menuBurgerIsActive,closeMenuBurger}) => {
    const { logout } = useAuth();
    const history = useHistory();


    const handleCloseMenuBurger = () => {
        closeMenuBurger && closeMenuBurger();
    }

    return (
        <header className={cn(
            "header__menu-header",
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
                                            handleCloseMenuBurger();
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
    );
};

export default HeaderMenu;