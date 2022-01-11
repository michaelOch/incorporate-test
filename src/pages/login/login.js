import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../services/context';
import { apiUrl, setDataToken, getDataToken } from '../../services/util';
import PageLoader from '../../components/PageLoader/PageLoader';

import { faUserAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './login.css';

function Login() {

    const initialState = {
        email: "",
        password: "",
        displayPassword: false,
        isSubmitting: false,
        errorMessage: null,
        successMessage: null,
        isLoading: true
    };

    const [data, setData] = useState(initialState);
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const { state } = useLocation();

    useEffect(() => {
        if (getDataToken()) {
            if (JSON.parse(getDataToken()).token) {
                navigate(state ? state.path : '/home');
            } else {
                setData({
                    ...data,
                    isLoading: false
                })
            }
        } else {
            setData({
                ...data,
                isLoading: false
            })
        }
    }, []);

    const handleChange = (e) => {
        e.preventDefault();

        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    };

    const toggleDisplayPassword = (e) => {
        e.preventDefault();

        setData({
            ...data,
            displayPassword: !data.displayPassword
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.email !== '' && data.password !== '') {
            setData({
                ...data,
                isSubmitting: true,
                errorMessage: null
            });
    
            axios.post(`${apiUrl}/user/login`, {
                email: data.email,
                password: data.password
            })
            .then(async res => {
                user.setAuth({
                    ...user.auth,
                    user: res.data.user,
                    token: res.data.token
                });

                await setDataToken(JSON.stringify(res.data));

                navigate(state ? state.path : '/home');
            })
            .catch(error => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: 'Incorrect Email or Password'
                });
                
            });
        } else {
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Empty fields'
            });
        }

    }

    return (
        <main>
            {
                data.isLoading ? 
                    (
                        <PageLoader />
                    )
                    : (
        <section className="container">
            <div className="login-wrapper mt-5 mx-auto">
                <div className='w-100 card card-body'>
                    <h3 className="text-center mb-3">Sign In</h3>
                    <div className="d-flex justify-content-center align-items-center round mb-3 mx-auto">
                        <FontAwesomeIcon icon={faUserAlt} size='3x' />
                    </div>
                    {
                        data.errorMessage && (
                            <div className="alert alert-danger">{data.errorMessage}</div>
                        )
                    }
                    <form className='w-100' onSubmit={handleSubmit}>
                        <div className='form-group mb-3'>
                            <input 
                                type="email" 
                                name='email' 
                                className='form-control' 
                                placeholder='Email' 
                                onChange={handleChange} 
                                value={data.email} 
                                noValidate
                            />
                        </div>
                        <div className="input-group mb-3">
                            <input 
                                type={ data.displayPassword ? 'text' : 'password' } 
                                name="password" 
                                className="form-control" 
                                placeholder="Password" 
                                onChange={handleChange} 
                                value={data.password} 
                                noValidate 
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" onClick={toggleDisplayPassword}>
                                    { data.displayPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} /> }.
                                </span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type='submit'className='btn btn-block btn-primary w-100' disabled={data.isSubmitting}>{data.isSubmitting ? "Loading..." : "Log In"}</button>
                        </div>
                        <p className="text-center">
                            Don't have an account? &nbsp;
                            <a href='/register'> 
                                Get Started
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
    }
    </main>
    )
}

export default Login;
