import axios from 'axios';

// Creazione Prodotto
export async function createProduct(nameproduct, categoryid, priceproduct) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:3000/products/create', { name: nameproduct, categoryId: categoryid, price: priceproduct }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error creating product");
    }
}

// Lettura Prodotti
export async function readProduct() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:3000/products/read', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error reading products");
    }
}

// Lettura Prodotti per ID
export async function readProductbyId(id) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:3000/products/readbyid',{ id: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("Error reading products");
    }
}

// Modifica Nome Prodotto
export async function updateNameProduct(idProduct, newName) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(`http://localhost:3000/products/updatename`, { id: idProduct, name: newName }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error("Error updating product name");
    }
}

// Modifica Prezzo Prodotto
export async function updatePriceProduct(idProduct, newPrice) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(`http://localhost:3000/products/updateprice`, { id: idProduct, price: newPrice }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error("Error updating product price");
    }
}

// Modifica Categoria Prodotto
export async function updateCategoryIDProduct(idProduct, newCategoryId) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(`http://localhost:3000/products/updatecategoryid`, { id: idProduct, categoryId: newCategoryId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error("Error updating product category ID");
    }
}

// Cancella Prodotto
export async function deleteProduct(idProduct) {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.delete(`http://localhost:3000/products/delete/${idProduct}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        throw new Error("Error deleting product");
    }
}