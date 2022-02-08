import React, {useState, useCallback, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../hooks/auth.hook";
import {useHttp} from "../../hooks/http.hook";

// import {MenuOutlined} from "@ant-design/icons";

import './Header.scss';


const Header = () => {
    const history = useHistory();
    const { request } = useHttp()
    const [name,setName] = useState('');
    const { logout } = useAuth();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData && userData.token ? userData.token : '';

    // console.log(token);


    const getUserName = useCallback( async () => {
        try {
            const userName = await request('/api/auth/getUserName', 'GET',null,{
                Authorization: `Bearer ${token}`
            });

            console.log('userName: ',userName);


            setName(userName);
        }
        catch (e) {}
    } ,[token]);

    useEffect(() => {
        userData && getUserName();
    },[getUserName])


    return (
        <div className="header">
            <div className="header__username">
                {/*<MenuOutlined className="burger" />*/}
                <div className="username">
                    { name }
                </div>
            </div>
            <div className="header__exit">
                {
                    userData && userData.token ?
                        (<a
                            className="logout"
                            onClick={() => {
                                logout();
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