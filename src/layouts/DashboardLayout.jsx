import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import Menu from "../components/dashboard/Menu/Menu";

function LoginLayout() {


    return (
        <div className="flex flex-row m-5">
            <div className=" flex w-full flex-col">

  <div className="h-20 bg-gray-800 rounded-xl text-white flex items-center px-4">
    <Navbar />
  </div>
  <div className="flex  mt-3 flex-1 h-16">

    <div className="w-64 rounded-xl  text-white">
       <Menu />
    </div>

    {/* CONTENT */}
    <div className="flex-1 bg-white p-4">
        <Outlet />
    </div>

  </div>

</div>
        </div>
    );
}

export default LoginLayout;