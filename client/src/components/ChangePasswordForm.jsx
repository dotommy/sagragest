import React, { useState } from 'react';
import { changePassword } from '../hook/AuthHook';

export default function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            await changePassword(oldPassword, newPassword);
            setSuccessMessage('Password changed successfully!');
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            setError('Failed to change password: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 w-full bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Modifica Password</h2>
            
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Vecchia Password:</label>
                    <input 
                        type="password"
                        id="oldPassword"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nuova Password:</label>
                    <input 
                        type="password"
                        id="newPassword"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <button 
                        type="submit"
                        className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Modifica Password...' : 'Modifica Password'}
                    </button>
                </div>
            </form>
        </div>
    );
}
