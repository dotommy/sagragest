import { useState, useContext  } from "react";
import { checkNaN, convertNumber } from "../utils/helper";
import { createProduct} from '../hook/ProductsHook'
import { UpdateProductsContext } from "../pages/Products";


export default function AddProductsForm({categories}) {
    const [namevalue, setNameValue] = useState("");
    const [selectedCategoryID, setSelectedCategoryID] = useState("1");
    const [pricevalue, setpricevalue] = useState("");

    const {updateProducts} = useContext(UpdateProductsContext)

    async function addProducts(e, name, categoryid, price) {
        const priceNaN = convertNumber(price)
        if (checkNaN(priceNaN)) {
            e.preventDefault();
            await createProduct(name, categoryid, price)
            updateProducts()
            setNameValue("")
            setpricevalue("")
        }
        else {
            console.log("Non è un numero")
            e.preventDefault()
        }
    }

    return (
        <form className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-4 p-4 shadow-md rounded-lg w-full sm:w-auto">
            <div className="flex flex-col items-start w-full sm:w-auto">
                <label>Nome:</label>
                <input 
                    className="p-2 border rounded-lg w-full sm:w-auto" 
                    value={namevalue} 
                    onChange={(e) => {setNameValue(e.currentTarget.value)}}
                />
            </div>
            <div className="flex flex-col items-start w-full sm:w-auto">
                <label>Categoria:</label>
                <select 
                    className="p-2 border rounded-lg w-full sm:w-auto" 
                    name="category" 
                    id="category" 
                    value={selectedCategoryID} 
                    onChange={(e) => {setSelectedCategoryID(e.target.value)}}
                >
                    {categories && categories.map((categoriesitem) => {
                        return <option key={categoriesitem.id} value={categoriesitem.id}>{categoriesitem.name}</option>
                    })}
                </select>
            </div>
            <div className="flex flex-col items-start w-full sm:w-auto">
                <label>Prezzo:</label>
                <input 
                    type="number" 
                    step="0.01" 
                    className="p-2 border rounded-lg w-full sm:w-auto" 
                    value={pricevalue} 
                    onChange={(e) => {setpricevalue(e.currentTarget.value)}}
                />
            </div>
            <button 
                onClick={(e) => {addProducts(e, namevalue, selectedCategoryID, pricevalue)}} 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 sm:mt-0"
            >
                Crea Prodotto
            </button>
        </form>
    )
}
