import React, { useEffect, useState, createContext} from 'react'
import { readCategories } from '../hook/CategoriesHook'
import AddProductsForm from '../components/AddProductsForm'
import EditDeleteModal from '../components/EditDeleteModal'

export const UpdateProductsContext = createContext();

export default function Products() {
    const [categories, setCategories] = useState()
    const [hiddenTab, setHiddenTab] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [propsModal, setPropsModal] = useState({
        id: '',
        category_id: '',
        name: '',
        price: '',
        type: ''
    })

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchcategories = await readCategories();
            setCategories(fetchcategories)
        };
        fetchCategories()
    }, []);

    function showModalClick() {
        setShowModal(!showModal)
    }

    function RenderModal(props) {
        return (<EditDeleteModal props={props}/>)
    }

    function addPropsModal(id,category_id, name, price, type) {
        setPropsModal({
            id: id,
            category_id: category_id,
            name: name,
            price: price,
            type: type,
        })
        showModalClick()
    }

    async function UpdateProducts() {
        const newcategories = await readCategories()
        setCategories(newcategories)
    }

  return (
    <UpdateProductsContext.Provider value={{ updateProducts: UpdateProducts, showModalClick: showModalClick }}>
        <div className="relative h-full w-full">
            {showModal && RenderModal(propsModal)}
            <div className="h-full flex flex-col items-center">
                <AddProductsForm categories={categories} />
                
                <div className="flex flex-col items-center w-full sm:w-[80%] mt-5 bg-white shadow-md p-4 rounded-lg">
                    <div className="flex flex-wrap justify-center gap-2 w-full">
                        {categories && categories.map((categoriesitem) => {
                            const products = categoriesitem.Products;
                            if (products.length > 0) {
                                return (
                                    <button 
                                        key={categoriesitem.id} 
                                        onClick={() => {setHiddenTab(Number(categoriesitem.id))}} 
                                        className={`mb-4 p-2 ${hiddenTab === categoriesitem.id ? 'border-b-2 border-indigo-500' : ''}`}
                                    >
                                        {categoriesitem.name}
                                    </button>
                                )
                            }
                        })}
                    </div>
                    {categories && categories.map((categoriesitem) => {
                        const products = categoriesitem.Products;
                        if (products.length > 0) {
                            return (
                                <div key={categoriesitem.id} className={hiddenTab === categoriesitem.id ? 'block w-full' : 'hidden'}>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th className="p-2 text-left">Nome</th>
                                                <th className="p-2 text-left">Prezzo</th>
                                                <th className="p-2 text-left">Azione</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((productsitem) => {
                                                return (
                                                    <tr key={productsitem.id} className="text-center border-b border-r">
                                                        <td className="p-2"><strong>{productsitem.name}</strong></td>
                                                        <td className="p-2">{productsitem.price}€</td>
                                                        <td className="p-2 flex justify-center gap-2">
                                                            <button 
                                                                onClick={() => {addPropsModal(productsitem.id, productsitem.category_id, productsitem.name, productsitem.price, 'delete')}} 
                                                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                            >
                                                                CANCELLA
                                                            </button>
                                                            <button 
                                                                onClick={() => {addPropsModal(productsitem.id, productsitem.category_id, productsitem.name, productsitem.price, 'edit')}} 
                                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                            >
                                                                MODIFICA
                                                            </button>
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
            </div>
        </div>
    </UpdateProductsContext.Provider>
  )
}

