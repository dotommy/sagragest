import React, { useEffect, useState } from 'react'
import { readOrder } from '../hook/OrdersHook'
import { generatePDF } from '../hook/ReceiptHook'
import { readProductbyId } from '../hook/ProductsHook'

export default function ListOrders() {
  const [orders, setOrders] = useState()
  useEffect(()=>{
    async function fetchOrders() {
      const fetchorders = await readOrder()
      setOrders(fetchorders)
      console.log(fetchorders)
    }
    fetchOrders()
  },[])

  async function createPdf(order) {
    const emptyarray = [];
    emptyarray.push(order);
    await generatePDF(emptyarray);
  }
  
  return (
    <div className="flex flex-col items-center w-full sm:w-[80%] mt-5 bg-white shadow-md p-4 rounded-lg">
      <div className='w-full flex flex-col justify-center'>
      <div className="mt-5 w-full">
      {
        !orders
          ? <h1>Nessun Ordine</h1> 
          : <div>
            <h1 className='flex justify-center ext-lg text-xl font-bold mb-3'>Ordini:</h1>
            <table className=" text-center min-w-full border-collapse">
              <thead>
                  <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                      <th className="border p-2">Ordine</th>
                      <th className="border p-2">Nome</th>
                      <th className="border p-2">Totale</th>
                      <th className="border p-2">Azione</th>
                  </tr>
              </thead>
              <tbody>
                  {orders.map((order) => (
                      <tr key={order.id}>
                          <td className="border p-2">#{order.id}</td>
                          <td className="border p-2">{order.customerName}</td>
                          <td className="border p-2">{order.ordertotal}</td>
                          <td className="border p-2">
                            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-1' onClick={() => {createPdf(order)}}>Stampa</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
      }
    </div>
    </div>
    </div>
  )
}
