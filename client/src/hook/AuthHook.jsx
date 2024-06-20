import axios from 'axios';

// Registrazione nuovo account
export async function register(username, password) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await axios.post('http://localhost:3000/auth/register',{ username: username, password: password }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error");
    }
}

// Lettura di tutti gli Users (Solo isAdmin true)

export async function getUsers() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await axios.get('http://localhost:3000/auth/getusers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error retrieving users');
    }
}

// Cambio password

export async function changePassword(oldPassword, newPassword) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await axios.post('http://localhost:3000/auth/changepassword', {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Error changing password: ' + error.message);
    }
}