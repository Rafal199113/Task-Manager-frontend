
import logo from '../../assets/app/icon.png'
import { useApp } from "../../providers/AppProvider";

function Navbar(){
    const appName = import.meta.env.VITE_APP_NAME;
    const { message } = useApp();
    return (
         <>
   <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3 py-4">
        <img src={logo} alt="Logo" className="w-20 h-20" />
        <h1 className="text-xl font-bold text-white">{appName}</h1>
      </div>
      <div
        className={`w-1/5 p-2 text-white text-center rounded
          ${message?.type === "success" ? "bg-green-600" : ""}
          ${message?.type === "error" ? "bg-red-600" : ""}
        `}
      >
         <span>{message?.text}</span>
      </div>
    </div>
  </>
  );
}

export default Navbar