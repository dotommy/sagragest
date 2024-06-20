import React, { useEffect, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';


export default function Navbar() {
  const [username, setUsername] = useState('')
  const { logout } = useAuth()

  useEffect(() => {
    const username = localStorage.getItem('username')
    setUsername(username)
  },[])
  return (
    <Sidebar className='h-full'>
      <Menu>
        <div className='flex h-full items-center justify-center'><h1>SagraGest</h1></div>
        <div><h2>Benvenuto {username}</h2></div>
        <SubMenu label="Ordini" >
          <MenuItem component={<Link to="/" />}>Crea Ordine</MenuItem>
          <MenuItem component={<Link to="/list" />}>Lista Ordini</MenuItem>
        </SubMenu>
        <MenuItem component={<Link to="/products" />}>Prodotti</MenuItem>
        <MenuItem component={<Link to="/settings" />}>Impostazioni</MenuItem>
      </Menu>
      <button onClick={() => {logout()}} className="px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-700">Logout</button>
  </Sidebar>
  )
}
