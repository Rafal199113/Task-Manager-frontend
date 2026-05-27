import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { auth, getMe, logout } from "../services/api/auth.service";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [roles, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLogged(false);
            setLoading(false);
            return;
        }
        setIsLogged(true);
        if (!user) {
            getMe().then((response) => {
                setUser(response.data.user);
                setRole(response.data.roles);
                console.log(response.data.roles)
            }).catch(() => {
                setIsLogged(false);
                localStorage.removeItem("token");
            });
        }

        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await auth(email, password);
        setUser(response.user);
        setRole(response.roles);
        setIsLogged(true);
        localStorage.setItem('token', response.token);
        return response;
    };

    const logoutUser = async () => {
        const response = await logout().then(() => setIsLogged(false));
    };

    const access = (user) => {
        console.log(user)
        const permissions = user?.permissions || [];
        const roles = user?.roles || [];

        const hasPermission = (perm) =>
            permissions.includes(perm);

        const hasRole = (role) =>
            roles.includes(role);

        const can = (perm) =>
            hasPermission(perm);

        return {
            permissions,
            roles,
            hasPermission,
            hasRole,
            can,
        };
    }

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
                roles,
                access
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