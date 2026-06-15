import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function ProtectedRoute(){
    const {isLogged, permissions} = useAuth();
    const navigate  = useNavigate(); 
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    if(permissions){
        let exists = Object.hasOwn(permissions, path);
            const modulePermissions = permissions?.[path];

            if(exists){
                if(! modulePermissions?.['view']){
                    navigate('/dashboard')
                }
            }
    }
    

    if (!isLogged) return <Navigate to="/login" replace/>

    return <Outlet/>
}