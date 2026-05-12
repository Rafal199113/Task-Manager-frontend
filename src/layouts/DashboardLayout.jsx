import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import { useEffect } from "react";

function LoginLayout() {


    return (
        <div className="flex flex-row m-5">
            <Outlet />
        </div>
    );
}

export default LoginLayout;