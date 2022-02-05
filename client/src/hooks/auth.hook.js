import { useState,useCallback,useEffect } from 'react';


export const useAuth = () => {
    const [token,setToken] = useState(null);
    const [userId,setUserId] = useState(null);
    const [userEmail,setUserEmail] = useState(null);
    const [userName,setUserName] = useState(null);

    const login = useCallback((jwtToken,id,mail,name) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem('userData', JSON.stringify({
            userId: id, token: jwtToken, userEmail: mail, userName: name
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserEmail(null);
        setUserName(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'));

        if(data && data.token) {
            login(data.token, data.userId, data.email, data.name);
        }
    }, [login])

    return { login,logout,token,userId,userEmail,userName };
}