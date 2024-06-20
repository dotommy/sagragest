import React, {useEffect, useState, useContext} from 'react'
import { readCategories } from '../hook/CategoriesHook'
import { OrderContext } from '../pages/Orders'

function SetOrder() {
    const [categories, setCategories] = useState()
    const [hiddenTab, setHiddenTab] = useState(1)
    const {order, setOrder} = useContext(OrderContext)

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchcategories = await readCategories();
            setCategories(fetchcategories)
        };
        fetchCategories()
    }, []);

    useEffect(() => {
        //console.log(order)
    }, [order]);

    function orderArray() {
        setOrder(prevstats =>{
            const cloneorder = [...prevstats]
            return cloneorder.sort((a, b) => {
                if (a.category_id !== b.category_id) {
                    return a.category_id - b.category_id;
                  }
                  return a.id - b.id;
            })
        }
        )
    }

    function removeProductsOrder(id) {
        const neworder = [...order]
        const indexremove = neworder.findIndex(item => item.id === id)
        if (indexremove != -1) {
            neworder.splice(indexremove, 1)
            setOrder(neworder)
        }
    }

    function pushQuantity(id, number) {
        setOrder(prevOrder => prevOrder.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + number, total: (item.quantity + number) * item.price } : item
        ));
    }

    function pushNewOrder(id, category_id, name, price, number) {
        setOrder(prevOrder => [
            ...prevOrder, 
            {
                id: id,
                category_id: category_id,
                name: name,
                price: price,
                quantity: number,
                total: price * number
            }
        ])
        orderArray();
    }

    function pushOrder(id, category_id, name, price, number) {
        const existingProduct = order.find(item => item.id === id);
        if (existingProduct && existingProduct.quantity === 1 && number === -1) {
            removeProductsOrder(id);
        } else if (existingProduct) {
            pushQuantity(id, number);
        } else {
            pushNewOrder(id, category_id, name, price, number);
        }
    }

    return (
        <div className='flex flex-col items-center w-[90%] mt-5 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
            <div className='w-full mt-4 flex justify-end'><button onClick={() => {{setOrder([])}}} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Cancella tutto</button></div>
            <div className='flex flex-row justify-center gap-2 w-full'>
                        {categories && categories.map((categoriesitem) => {
                            const products = categoriesitem.Products
                            if (products.length > 0) {
                                return (
                                <button key={categoriesitem.id} onClick={() => {setHiddenTab(Number(categoriesitem.id))}} className={ hiddenTab === categoriesitem.id ? 'mb-4 p-2 border-indigo-500/100 border-b-[3px]' : 'mb-4 p-2'} >{categoriesitem.name}</button>
                            )
                            }
                        })}
                    </div>
                    {categories && categories.map((categoriesitem) => {
                        const products = categoriesitem.Products
                        if (products.length > 0) {
                            return (
                            <div key={categoriesitem.id} className={hiddenTab === categoriesitem.id ? 'block w-full' : 'hidden'}>
                                <table className='w-full'>
                                    <tbody>
                                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                            <th>Nome</th>
                                            <th>Prezzo</th>
                                            <th>Quantità</th>
                                        </tr>
                                            {products.map((productsitem) => {
                                            return (
                                            <tr key={productsitem.id}  className='text-center border-b border-r'>
                                                <td><strong>{productsitem.name}</strong></td>
                                                <td>{productsitem.price}€</td>
                                                <td className='flex justify-center'>
                                                    <button disabled={(order.find(item => item.id === productsitem.id)?.quantity === 0) || (order.find(item => item.id === productsitem.id) === undefined) && true} onClick={() => {pushOrder(productsitem.id, productsitem.category_id, productsitem.name, productsitem.price, -1)}} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-slate-400'>-</button>
                                                    <strong className='flex items-center mr-4 ml-4'>{order.find(item => item.id === productsitem.id)?.quantity ?? 0}</strong>
                                                    <button onClick={() => {pushOrder(productsitem.id, productsitem.category_id, productsitem.name, productsitem.price, 1)}} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>+</button>
                                                </td>   
                                            </tr>
                                            )
                                            })}
                                    </tbody>
                                </table>
                        </div>
                    )
                    }
                })}
        </div>
    )
}

export default SetOrder
