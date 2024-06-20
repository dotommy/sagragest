import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });
    
            const data = response.data;
            if (response.status === 200) {
                
                if (data.token) {
                    login(data.token)
                    console.log(data)
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('isAdmin', data.isAdmin)
                    setIsAuthenticated(true);
                    navigate('/');
                } else {
                    setError('Token JWT non ricevuto');
                }
            } else {
                setError('Username o password errati');
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
            setError('Username o Password Errati');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded px-4 py-8 w-full max-w-xs">
                <h1 className="text-2xl mb-6 text-center">Sagragest</h1>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 mb-4 rounded">{error}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="********"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}