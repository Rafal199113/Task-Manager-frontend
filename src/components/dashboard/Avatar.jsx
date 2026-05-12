
import { useState, useEffect } from "react";
import { useAuth } from '../../providers/AuthProvider'



function Avatar(){
    const { user } = useAuth();

      useEffect(()=>{
       
      },[user])
  
     
    return (
       <div>
         <div className="text-red-600"></div>
       </div>
  );
}

export default Avatar