import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function ProtectedRoute(){
    const {user, isLogged} = useAuth();
    
          
        if (!isLogged) return <Navigate to="/login" replace/>
    

    return <Outlet/>
}