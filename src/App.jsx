import { Routes, Route } from "react-router-dom";

import LoginLayout from "./layouts/login_layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "@/layouts/dashboard_layout";
import ProtectedRoute from "./middleware/auth";
import Users from "./pages/users/index";
import Create from "./pages/users/create";
import Edit from "./pages/users/edit";
import RoleEdit from "pages/administration/roles/edit";
import Role from "pages/administration/roles/index";
import AdminLayout from "./layouts/admin_layout";
import Permissions from "pages/administration/premissions/index";
import Projects from "pages/projects/index";
import ProjectCreate from "./pages/projects/create";
import ProjectEdit from "./pages/projects/edit";
import Settings from "./pages/settings/index";

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

                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>

        </Routes>
    );
}

export default App;