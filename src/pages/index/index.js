import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../services/context';
import { apiUrl, removeDataToken } from '../../services/util';
import Header from '../../components/Header/Header';

import './index.css';

function Index() {
    
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
        <div className=''>
            <Header />
            <section className='pt-5'>
                <div className='container'>
                <div className='row'>
                        <div className=''>
                            <h3>Welcome <small className='text-success'>{user.auth.user && user.auth.user.email}</small></h3>
                            <a className='btn btn-primary' href='/profile'>Profile</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Index;
