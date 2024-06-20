import React, { createContext, useState,useEffect, useContext } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        async function verifyToken() {
            try {
                const localToken = localStorage.getItem('token');
                if (!localToken) {
                    setIsAuthenticated(false);
                    return;
                }
    
                const response = await axios.get('http://localhost:3000/auth/verifytoken', { 
                    headers: {
                        Authorization: `Bearer ${localToken}`
                    }
                });
    
                const { valid } = response.data;
    
                if (!isAuthenticated) {
                    if (valid) {
                        setIsAuthenticated(true);
                    } else {
                        localStorage.removeItem('token');
                        setToken(null);
                        localStorage.removeItem('username');
                        localStorage.removeItem('isAdmin');
                    }
                } else if (!valid) {
                        localStorage.removeItem('token');
                        setToken(null);
                        localStorage.removeItem('username');
                        localStorage.removeItem('isAdmin');
                }
            } catch (error) {
                console.error(error);
            }
        }
    
        verifyToken();
    
        setInterval(verifyToken, 10000);
    
    }, [isAuthenticated]);

    function login(token) {
        setIsAuthenticated(true);
        setToken(token);
        localStorage.setItem('token', token);
    };

    function logout() {
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
    };
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
