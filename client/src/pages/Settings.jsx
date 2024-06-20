import React, {useEffect, useState} from 'react';
import ListUsers from '../components/ListUsers';
import ChangePasswordForm from '../components/ChangePasswordForm';

export default function Settings() {
  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    const isadmin = localStorage.getItem('isAdmin');
    if (isadmin === 'true') {setIsAdmin(true)}
    else if (isadmin === 'false') {setIsAdmin(false)}
  },[]);

  return (
    <div className="flex flex-col items-center w-[90%] max-w-4xl mt-5 mb-5 bg-white shadow-lg p-5 rounded-md">
      <h1 className="text-xl font-bold mb-5">Impostazioni</h1>
      {isAdmin && <ListUsers/>}
      <ChangePasswordForm/>
    </div>
  );
}
