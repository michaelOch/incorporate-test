import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../../services/util';

import { faUserAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Register.css';

function Register() {

    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        displayPassword: false,
        isSubmitting: false,
        errorMessage: null,
        successMessage: null
    };

    const [data, setData] = useState(initialState);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.name !== '' && data.email !== '' && data.password !== '' && data.confirmPassword !== '') {
            
            if (data.password === data.confirmPassword) {
                setData({
                    ...data,
                    isSubmitting: true,
                    errorMessage: null
                });
        
                axios.post(`${apiUrl}/user/register`, {
                    email: data.email,
                    password: data.password,
                    name: data.name
                })
                .then(res => {
    
                    setData({
                        ...data,
                        isSubmitting: false,
                        successMessage: 'Registration successful.',
                        errorMessage: null,
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    });
                })
                .catch(error => {
                    setData({
                        ...data,
                        isSubmitting: false,
                        successMessage: null,
                        errorMessage: error.statusText || 'Registration unsuccessful. Try again!'
                    });
                    
                });
            } else {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: "Passwords don't match"
                });
            }

        } else {
            setData({
                ...data,
                isSubmitting: false,
                errorMessage: 'Empty field(s)'
            });
        }

    }

    return (
        <section className="container">
            <div className="register-wrapper mt-5 mx-auto">
                <div className='w-100 card card-body'>
                    <h3 className="text-center mb-3">Sign Up</h3>
                    <div className="d-flex justify-content-center align-items-center round mb-3 mx-auto">
                        <FontAwesomeIcon icon={faUserAlt} size='3x' />
                    </div>
                    {
                        data.successMessage && (
                            <div className="alert alert-success">{data.successMessage}</div>
                        )
                    }
                    {
                        data.errorMessage && (
                            <div className="alert alert-danger">{data.errorMessage}</div>
                        )
                    }
                    <form className='w-100' onSubmit={handleSubmit}>
                        <div className='form-group mb-3'>
                            <input 
                                type="text" 
                                name='name'
                                className='form-control' 
                                placeholder='Name' 
                                onChange={handleChange} 
                                value={data.name} 
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input 
                                type="email" 
                                name='email'
                                className='form-control' 
                                placeholder='Email' 
                                onChange={handleChange} 
                                value={data.email} 
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
                        <div className='form-group mb-3'>
                            <input 
                                type="password" 
                                name='confirmPassword'
                                className='form-control' 
                                placeholder='Confirm Password' 
                                onChange={handleChange} 
                                value={data.confirmPassword}
                                noValidate
                            />
                        </div>
                        <div className="mb-3">
                            <button type='submit'className='btn btn-block btn-primary w-100' disabled={data.isSubmitting}>{data.isSubmitting ? "Loading..." : "Register"}</button>
                        </div>
                        <p className="text-center mt-4">
                            Already have an account? &nbsp;
                            <a href='/login'> 
                                Sign in
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register;
