import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from './services/context';
import { getDataToken } from './services/util';
import Auth from './components/Auth/Auth';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Index/Index';
import Profile from './pages/Profile/Profile';
import './App.css';

function App() {

    const initialState = {
        user: null,
        token: null
    };

    const [auth, setAuth] = useState(initialState);

    useEffect(() => {
        const updateData = JSON.parse(getDataToken());
        if (updateData) {
            setAuth({
                user: updateData.user,
                token: updateData.token
            })
        }
    }, []);

    return (
        <UserContext.Provider value={{auth, setAuth}}>
            <Router basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route 
                        exact
                        path={process.env.PUBLIC_URL + '/'}
                        element={<Login />}
                    />
                    <Route 
                        exact
                        path={process.env.PUBLIC_URL + '/login'}
                        element={<Login />}
                    />
                    <Route 
                        exact
                        path={process.env.PUBLIC_URL + '/register'}
                        element={<Register />}
                    />
                    <Route 
                        exact 
                        path={process.env.PUBLIC_URL + '/home'} 
                        element={
                            <Auth>
                                <Home />
                            </Auth>
                        } 
                    />
                    <Route 
                        exact 
                        path={process.env.PUBLIC_URL + '/profile'} 
                        element={
                            <Auth>
                                <Profile />
                            </Auth>
                        } 
                    />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
