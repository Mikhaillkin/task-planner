import React from 'react';

import { useHistory } from 'react-router-dom';
import {useAuth} from "../../hooks/auth.hook";

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
        </>
    );
};

export default Exit;