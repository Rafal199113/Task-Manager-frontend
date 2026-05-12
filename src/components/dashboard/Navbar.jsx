
import { useState } from "react";
import { useAuth } from '../../providers/AuthProvider'
import Avatar from '../../components/dashboard/Avatar'
import { useTranslation } from 'react-i18next';
import logo from '../../assets/app/icon.png'


function Navbar(){
    const appName = import.meta.env.VITE_APP_NAME;
    return (
         <>
   <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3 py-4">
        <img src={logo} alt="Logo" className="w-20 h-20" />
        <h1 className="text-xl font-bold text-white">{appName}</h1>
      </div>

      
    </div>
  </>
  );
}

export default Navbar