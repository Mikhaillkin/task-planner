import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import HeaderMenu from "../HeaderMenu";

import userPhotoPng from './images/user-photo-png.png';

import {MenuOutlined,CloseOutlined} from '@ant-design/icons';
import './Header.scss';


const Header = () => {
    const history = useHistory();
    const [menuBurgerIsActive,setMenuBurgerActive] = useState(false);

    const closeMenuBurger = () => {
        setMenuBurgerActive(prevState => !prevState);
    }


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
            <HeaderMenu menuBurgerIsActive={menuBurgerIsActive} closeMenuBurger={closeMenuBurger} />
        </>
    );
};

export default Header;