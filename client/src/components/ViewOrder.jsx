import React, {useContext, useState, useEffect} from 'react'
import { OrderContext } from '../pages/Orders'
import { createOrder, readOrder, readOrderbyId } from '../hook/OrdersHook'
import { createOrderItems } from '../hook/OrdersItemsHook'
import { generatePDF } from '../hook/ReceiptHook'

function ViewOrder() {
    const {order, setOrder, setSuccess} = useContext(OrderContext)
    const [totalorder, setTotalOrder] = useState(0)
    const [name, setName] = useState('')
    const [numberorder, setNumberOrder] = useState(null)
    const [nameError, setNameError] = useState(false);

    async function fetchData() {
        const readingdata = await readOrder();
        console.log(readingdata);
        if (readingdata.length === 0) {
            setNumberOrder(1);
        }
        else {
            const lastorder = readingdata[readingdata.length - 1]
            setNumberOrder(lastorder.id + 1)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const ordertotal = order.reduce((acc, orderitem) => acc + orderitem.price * orderitem.quantity, 0);
        setTotalOrder(ordertotal)
        console.log(order)
    },[order])

    async function createFullOrder(){
        if (name.trim() === '') {
            setNameError(true);
            return;
        }

        const createorder = await createOrder(name, totalorder)

        for (const orderitem of order) {
            await createOrderItems(createorder.id, orderitem.id, orderitem.quantity);
        }

        const order_props = await readOrderbyId(createorder.id)
        generatePDF(order_props)
        setNumberOrder(numberorder + 1)
        setOrder([])
        setSuccess(true)
        setName('')
        setNameError(false);
        fetchData();
    }

    function handleNameChange(e) {
        setName(e.target.value);
      }
    
  return (
    <div className='flex flex-col w-[90%] mt-5 mb-5 bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
            <div className='flex flex-col justify-center items-center gap-2 mt-4'>
                <div className='flex flex-row gap-2'>
                    <h1 className='text-xl'><strong>Ordine: #{numberorder}</strong></h1>
                </div>
                <div className='flex flex-row gap-2 mb-4'>
                    <h1>Nome:</h1>
                    <input value={name} onChange={(e) => {handleNameChange(e)}} className={`border-2 ${nameError ? 'border-red-500' : 'border-current'}`}></input>
                </div>
            </div>
            <div className='w-full h-full flex flex-row justify-center gap-2'>
                <div className='w-full'>
                    <table className='w-full'>
                        <tbody>
                            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <th>Nome</th>
                                <th>Prezzo</th>
                                <th>Quantità</th>
                                <th>Totale</th>
                            </tr>
                            {order.map((orderitems) => {
                                return (
                                    <tr className='text-center border dark:bg-gray-800 dark:border-gray-700' key={orderitems.id}>
                                        <td className='border-r dark:bg-gray-800 dark:border-gray-700'><strong>{orderitems.name}</strong></td>
                                        <td className='border-r dark:bg-gray-800 dark:border-gray-700'>{orderitems.price}</td>
                                        <td className='border-r dark:bg-gray-800 dark:border-gray-700'>{orderitems.quantity}</td>
                                        <td className='border-r dark:bg-gray-800 dark:border-gray-700'>{orderitems.total}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='flex items-end'><table className='w-full border dark:bg-gray-800 dark:border-gray-700'><tbody><tr><th className='border-r dark:bg-slate-800 dark:border-gray-700'>Totale:</th><th>{totalorder} €</th></tr></tbody></table></div>
            <button onClick={createFullOrder} className='mt-4 mr-4 ml-4 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Crea Ordine</button>
    </div>
  )
}

export default ViewOrder
