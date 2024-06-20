import Orders from '../pages/Orders';
import Products from '../pages/Products'
import Settings from './Settings';
import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import ListOrders from './ListOrders';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../auth/auth';


export default function Main() {
  const { isAuthenticated } = useAuth()

  return (
      <Router>
        {isAuthenticated ? <div className='w-full h-full flex flex-row bg-white antialiased'>
          <Navbar />
          <div className='flex h-full w-full justify-center'>
            <Routes>
              <Route path="/" element={<Orders />} />
              <Route path="/list" element={<ListOrders />} />
              <Route path="/products" element={<Products />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div> : <Login/>}
      </Router>
  );
}