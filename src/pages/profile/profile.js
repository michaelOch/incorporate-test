import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../services/context';
import { apiUrl, removeDataToken } from '../../services/util';
import Header from '../../components/Header/Header';

import './profile.css';

function Profile() {

    const [data, setData] = useState();
    const navigate = useNavigate();
    const user = useContext(UserContext);

    useEffect(() => {
        if (user.auth) {
            if (user.auth.user) {
                axios.get(`${apiUrl}/user/${user.auth.user._id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + user.auth.token
                    }
                })
                .then(res => {
                    setData({
                        ...data,
                        user: res.data.user
                    });
                })
                .catch(err => {
                    if (err.response.status) {
                        removeDataToken('data');
                        navigate('/');
                    }
                })
            }
        }
        
    }, [user, apiUrl]);

    return (
        <div>
            <Header />
            <section className='pt-5'>
                <div className='container'>
                <div className='row'>
                        <div className=''>
                            <h3>Hello <small className='text-info'>{data && data.user && data.user.name}</small></h3>
                            <a className='btn btn-primary' href='/home'>Home</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile;
