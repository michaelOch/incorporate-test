import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from './services/context';
import { getDataToken } from './services/util';
import Auth from './components/Auth/Auth';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/index/index';
import Profile from './pages/profile/profile';
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
            <Router>
                <Routes>
                    <Route 
                        exact
                        path='/'
                        element={<Login />}
                    />
                    <Route 
                        exact
                        path='/login'
                        element={<Login />}
                    />
                    <Route 
                        exact
                        path='/register'
                        element={<Register />}
                    />
                    <Route 
                        exact 
                        path="/home" 
                        element={
                            <Auth>
                                <Home />
                            </Auth>
                        } 
                    />
                    <Route 
                        exact 
                        path="/profile" 
                        element={
                            <Auth>
                                <Profile />
                            </Auth>
                        } 
                    />
                    {/* <Route 
                        exact 
                        path="/profile" 
                        element={<Profile />} 
                    /> */}
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App;