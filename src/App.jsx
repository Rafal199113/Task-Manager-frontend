import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import LoginLayout from "./layouts/LoginLayout";
import Login from "./pages/Login";
import './index.css'

function App() {
  const [count, setCount] = useState(0)

    return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App
