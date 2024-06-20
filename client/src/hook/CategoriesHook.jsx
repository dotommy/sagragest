import axios from 'axios';

// Lettura Categorie
export async function readCategories() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await axios.get('http://localhost:3000/categories/read', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error reading categories");
    }
}
