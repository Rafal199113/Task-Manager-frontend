import React, { createContext, useContext, useEffect, useState,} from "react";
import { auth, getMe, logout } from "../services/api/auth.service";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [modules, setModules] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
      
    
    const initAuth = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setIsLogged(false);
            setLoading(false);
            return;
        }

        try {
            setIsLogged(true);

            const response = await getMe();

            setUser(response.data.user);
            setRole(response.data.user.roles?.[0]);
            setModules(response.data.modules);
            setPermissions(response.data.modulesPermissions);

        } catch (err) {
            console.error("getMe error:", err);
            setIsLogged(false);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    initAuth();
}, []);

    const login = async (email, password) => {
        const response = await auth(email, password);
        setUser(response.user);
        setRole(response.user.roles[0]);
        setModules(response.modules);
        setPermissions(response?.modulesPermissions);
        setIsLogged(true);
        localStorage.setItem('token', response.token);
        return response;
    };

    const logoutUser = async () => {
        await logout().then(() => setIsLogged(false));
    };

    const can = (permission) => {
        return checkPermission(permissions, permission);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                logoutUser,
                isLogged,
                setIsLogged,
                role,
                modules,
                permissions,
                can
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}

function checkPermission(permissions, permission){
   if (permissions) {
        let [key, value] = permission.split('.');

        let exists = Object.hasOwn(permissions, key);
        const modulePermissions = permissions?.[key];

        if (exists) {
            switch (value) {
                case 'edit':
                    if (modulePermissions?.['edit']) {
                        return true;
                    }
                    break;
                case 'update':
                    if (modulePermissions?.['update']) {
                        return true;
                    }

                    break;
                case 'create':
                    if (modulePermissions?.['create']) {
                        return true;
                    }

                    break;
                case 'delete':
                    if (modulePermissions?.['delete']) {
                        return true;
                    }

                    break;
                default:
                    break;
            }
        }
    }
    return false;
}