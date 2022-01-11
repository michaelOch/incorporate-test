import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../services/context';

function Auth({ children }) {

    const user = useContext(UserContext);
    const location = useLocation();

    return user.auth.token 
        ? children 
        : <Navigate 
            to="/" 
            replace 
            state={{
                path: location.pathname
            }}
        />
}

export default Auth;
