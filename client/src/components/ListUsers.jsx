import React, { useEffect, useState } from 'react';
import { register, getUsers } from '../hook/AuthHook';

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    const handleCreate = async () => {
        setLoading(true);
        setError(null);
        try {
            await register(username, password);
            const data = await getUsers();
            setUsers(data);
            setUsername('');
            setPassword('');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full flex flex-col justify-center'>
            <div className='flex justify-center'>
                <h2 className="text-lg font-bold mb-3">Inserisci Nuovi Utenti</h2>
            </div>
            <div className="mt-5 flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                    <label className="font-medium">Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="border p-2 rounded-md w-full md:w-auto"
                    />
                    <label className="font-medium">Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="border p-2 rounded-md w-full md:w-auto"
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md mt-3 md:mt-0"
                        disabled={loading}
                    >
                        {loading ? 'Creazione...' : 'Crea'}
                    </button>
                </div>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <div className="mt-5 w-full">
                <h2 className="text-lg font-bold mb-3">Lista degli utenti</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Username</th>
                                <th className="border p-2">Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border p-2">{user.id}</td>
                                    <td className="border p-2">{user.username}</td>
                                    <td className="border p-2">{user.isAdmin ? 'Si' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


