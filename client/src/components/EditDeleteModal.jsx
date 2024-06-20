import React, { useContext, useEffect, useState } from 'react'
import { deleteProduct, updateNameProduct, updatePriceProduct, updateCategoryIDProduct } from '../hook/ProductsHook'
import { readCategories } from '../hook/CategoriesHook'
import { UpdateProductsContext } from '../pages/Products'
function DeleteModal({props}) {

    const {updateProducts, showModalClick} = useContext(UpdateProductsContext)

    async function deleteModalProducts(id) {
        await deleteProduct(id)
        console.log(id)
        updateProducts()
        showModalClick()
    }

    return (
        <div className='flex items-center flex-col bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px'>
                <h1 className='m-5'>Vuoi eliminare {props.name}?</h1>
                <div className='flex flex-row'>
                    <button onClick={() => {deleteModalProducts(props.id)}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Elimina</button>
                    <button onClick={() => {showModalClick()}} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>No</button>
                </div>
        </div>
    )
}

function EditModal({props}) {
    const [categories, setCategories] = useState()
    const [selectedCategoryID, setSelectedCategoryID] = useState("1");
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    const {updateProducts, showModalClick} = useContext(UpdateProductsContext)

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchcategories = await readCategories();
            setCategories(fetchcategories)
        };
        fetchCategories();
        setSelectedCategoryID(props.category_id)
        setName(props.name)
        setPrice(props.price)
    },[])

    function changeName(value) {
        setName(value)
    }

    function changePrice(value) {
        setPrice(value)
    }

    async function modifyProduct(id, name, categoryid, price) {
        if(props.name != name){
           await updateNameProduct(id, name)
        }
        else if (props.category_id != categoryid){
            await updateCategoryIDProduct(id, categoryid)
        }
        else if (props.price != price){
            await updatePriceProduct(id, price)
        }
        updateProducts()
        showModalClick()
    }

    return (
        <div className='h-96 w-96 flex mt-[10%] items-center justify-center flex-col bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px'>
                <h1 className='m-5'>Vuoi Modificare {name}?</h1>
                <div className='flex flex-col gap-y-5'>
                <div className='flex flex-row items-center'>
                    <label className='mr-2'>Nome:</label>
                    <input value={name} onChange={(e) => {changeName(e.currentTarget.value)}}></input>
                </div>
                <div className='flex flex-row items-center'>
                <label className='mr-2'>Categoria:</label>
                <select name="category" id="category" value={selectedCategoryID} onChange={(e) => {setSelectedCategoryID(e.target.value)}}>
                    {categories && categories.map((categoriesitem) => {
                        return <option key={categoriesitem.id} value={categoriesitem.id}>{categoriesitem.name}</option>
                        
                    })}
                </select>
                </div>
                <div className='flex flex-row items-center'>
                    <label className='mr-2'>Prezzo:</label>
                    <input type="number" step="0.01" value={price} onChange={(e) => {changePrice(e.currentTarget.value)}}></input>
                </div>
                </div>
                <div className='flex flex-row mt-4'>
                    <button onClick={() => {modifyProduct(props.id, name, selectedCategoryID, price)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Modifica</button>
                    <button onClick={() => {showModalClick()}} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>No</button>
                </div>
        </div>
    )
}
export default function EditDeleteModal({props}) {
    return (
        <div className='absolute h-full w-full p-[10%] bg-slate-200 bg-opacity-60'>
            <div className='flex justify-center items-center h-[20%]'>
                {props.type === "edit" ? <EditModal props={props} /> : <DeleteModal props={props}/>}
            </div>
        </div>
    )
}

