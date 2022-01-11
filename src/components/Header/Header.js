import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../services/context';
import { removeDataToken } from '../../services/util';

function Header() {

    const navigate = useNavigate();
    const user = useContext(UserContext);

    const logout = (e) => {
        e.preventDefault();

        user.setAuth({
            user: null,
            token: null
        });

        removeDataToken('data');

        navigate('/');

    }

    return (
        <header className='bg-primary px-1 py-3'>
            <div className='container'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4 className='text-light mb-0'>TEXT</h4>
                    <button type='button' className='btn btn-dark' onClick={logout}>Log Out</button>
                </div>
            </div>
        </header>
    )
}

export default Header;
