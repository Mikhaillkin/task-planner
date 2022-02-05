import React, {useState, useCallback, useEffect} from 'react';
import {useHttp} from "../../hooks/http.hook";
import {useAuth} from "../../hooks/auth.hook";

import GridLayout from "../../components/GridLayout";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import defaultAvatar from './assets/defaultAvatar.png';


const ProfilePage = () => {
    const { request } = useHttp();
    // const { userEmail,userName } = useAuth();
    // const [userName,setUserName] = useState('');
    const [avatar,setAvatar] = useState(null);
    const [avatarFromServer,setAvatarFromServer] = useState(null);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData && userData.token ? userData.token : '';
    const userEmail = userData && userData.userEmail ? userData.userEmail : '';
    const userName = userData && userData.userName ? userData.userName : '';

    // console.log(token);

    // const getUser = useCallback(async () => {
    //     try {
    //         console.log('Start request');
    //
    //
    //         const { name } = await request('/api/auth/getuserdata', 'POST', { email: userEmail }, {
    //             Authorization: `Bearer ${token}`
    //         });
    //
    //         console.log('End request');
    //
    //         setUserName(name);
    //     } catch (e) {}
    // }, [token,request]);
    //
    // useEffect(() => {
    //     getUser();
    //     console.log('getUser was called');
    // }, [getUser]);

    // console.log('User from Server: ',userName);


    console.log('Avatar: ',avatar);


    const uploadAvatar = useCallback(async () => {
        try {
            console.log('Start request');

            const data = await request('/api/auth/uploadavatar', 'POST', { email: userEmail, avatar: avatar }, {
                Authorization: `Bearer ${token}`
            });

            console.log('Data from request: ',data);

            console.log('End request');

            // setAvatarFromServer(avatar);
        } catch (e) {}
    }, [token,request]);

    // useEffect(() => {
    //     uploadAvatar();
    //     console.log('getUser was called');
    // }, [uploadAvatar]);



    // const onChangeSingleUploadFile = (e) => {
    //     setAvatar(e.target.files[0]);
    // }

    return (
        <GridLayout>
            <Header/>
            <div className="profile-page">
                ProfilePage
                <div>
                    { userName ? `Welcome Home, ${userName}` : `Welcome, ERROR NOT FOUND` }
                </div>
                <div>
                    { userEmail ? `Email: ${userEmail}` : `Email: ERROR NOT FOUND` }
                </div>
                <div>
                    Your token session: {token}
                </div>
                <div style={{ height: '100px',width: '100px',backgroundColor: 'blue',color: 'white', borderRadius: '50%',display: 'flex',justifyContent:'center',alignItems: 'center' }}>
                    Avatar
                </div>
                <div style={{ width: '300px',height: '300px',backgroundColor: 'grey' }} ></div>
                <div>
                    { avatarFromServer === null ? <img src={defaultAvatar} alt="NOT DOWNLOADED"/> : 'WW' }
                </div>
                <div>
                    <input type="file" onChange={ e => {
                        console.dir(e.target.files[0]);
                        setAvatar(e.target.files[0]);
                    } } />
                </div>
                <button style={{ backgroundColor: 'grey',padding: '10px' }} onClick={uploadAvatar} >
                    Загрузить новый аватар
                </button>
            </div>
            <Footer/>
        </GridLayout>
    );
};

export default ProfilePage;