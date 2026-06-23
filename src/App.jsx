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
import Permissions from 'pages/Administration/Premissions/index'
import Projects from 'pages/Projects/index'
import ProjectCreate from './pages/Projects/Create';
import ProjectEdit from './pages/Projects/Edit';

function App() {
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
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="roles" element={<Role />} />
                        <Route path="roles/edit/:id" element={<RoleEdit />} />
                        <Route path="permissions" element={<Permissions />} />
                    </Route>

                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/create" element={<ProjectCreate />} />
                    <Route path="projects/edit/:id" element={<ProjectEdit />} />

                </Route>
            </Route>

        </Routes>
    );
}

export default App;