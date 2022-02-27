import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from "../../hooks/http.hook";

import Exit from "../Exit/index.js";

import './Header.scss';


const Header = () => {
    const { request } = useHttp()
    const [name,setName] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData && userData.token ? userData.token : '';


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
    },[getUserName,userData])


    return (
        <div className="header">
            <div className="header__username">
                <div className="username">
                    { name }
                </div>
            </div>
            <div className="header__exit">
                <Exit />
            </div>
        </div>
    );
};

export default Header;