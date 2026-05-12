import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import LoginLayout from "./layouts/LoginLayout";
import Login from "./pages/Login";
import './index.css'
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProtectedRoute from './middleware/Auth';

function App() {
  const [count, setCount] = useState(0)

    return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
         <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
