import React, {useState, createContext, useEffect} from 'react'
import SetOrder from '../components/SetOrder'
import ViewOrder from '../components/ViewOrder';

export const OrderContext = createContext();
export default function Orders() {
  const [order, setOrder] = useState([])
  const [success, setSuccess] = useState(false)

  return (
    <OrderContext.Provider value={{order: order, setOrder: setOrder, setSuccess: setSuccess}}>
      <div className='h-full w-full flex flex-col'>
        {success && <div className="p-4 mb-4 text-sm text-green-900 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
          <span className="font-medium">Ordine creato!</span>
        </div>}
        <div className='flex flex-row justify-center h-full w-full'>
          <div className='flex flex-row justify-center h-[50%] w-full'>
            <SetOrder/>
          </div>
          <div className='flex flex-row justify-center h-full w-full'>
            <ViewOrder/>
          </div>
        </div>
      </div>
    </OrderContext.Provider>
  )
}
