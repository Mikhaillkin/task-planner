import React from 'react';

import { useHistory } from 'react-router-dom';
import {useAuth} from "../../hooks/auth.hook";

import './Exit.scss';

const Exit = () => {
    const history = useHistory();
    const { logout } = useAuth();
    const userData = JSON.parse(localStorage.getItem('userData'));


    return (
        <>
            {
                userData && userData.token ?
                    (<a
                        href="/#"
                        className="logout"
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                            history.push('/auth');
                        }
                        }
                    >
                        Log out
                    </a>)
                    :
                    null
            }
        </>
    );
};

export default Exit;