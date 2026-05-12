import { Outlet } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import  Error  from "@/components/shared/Error";
import { useNavigate } from "react-router-dom";

import { useAuth } from '../../providers/AuthProvider'

function LoginCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  const { login } = useAuth();
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
      login(email, password).then((user) => {
    
        navigate("/dashboard");
        });

  


   

      

    }
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <form onSubmit={handleSubmit} className="min-h-[300px] w-[600px] bg-white border border-gray-200 rounded-lg">
                <span className="text-2xl font-bold text-center block mt-5">Logowanie</span>
                <div className="flex flex-col items-center justify-center mt-10 gap-5">
                    <input placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-[80%] p-2 border border-gray-300 rounded-md" />
                    <input placeholder="hasło"   value={password} onChange={(e) => setPassword(e.target.value)} className="w-[80%] p-2 border border-gray-300 rounded-md" />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Zaloguj się</button>
                </div>
                <Error message={error} onClose={() => setError("")} />
            </form>
            
        </div>
  );
}

export default LoginCard;