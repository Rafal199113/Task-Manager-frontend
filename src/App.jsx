import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import LoginLayout from "./layouts/LoginLayout";
import Login from "./pages/Login";

import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from '@/layouts/DashboardLayout';

import ProtectedRoute from './middleware/Auth';

import Users from './pages/Users/Index';
import Create from './pages/Users/Create';
import Edit from './pages/Users/Edit';

import RoleEdit from 'pages/Administration/Roles/Edit'
import Role from 'pages/Administration/Roles/index'
import AdminLayout from './layouts/AdminLayout';
import Tab from 'pages/Administration/_tab'

function App() {
    const [count, setCount] = useState(0)

    return (
        <Routes>

            {/* LOGIN */}
            <Route element={<LoginLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* PROTECTED */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>

                    {/* DASHBOARD */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* USERS */}
                    <Route path="/users">
                        <Route index element={<Users />} />
                        <Route path="create" element={<Create />} />
                        <Route path="edit/:id" element={<Edit />} />
                    </Route>

                    {/* ADMINISTRATION */}
                    <Route path="/administration" element={<AdminLayout />}>
                        <Route path="roles" element={<Role />} />
                        <Route path="roles/edit/:id" element={<RoleEdit />} />
                    </Route>

                </Route>
            </Route>

        </Routes>
    );
}

export default App;