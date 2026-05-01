import { Outlet } from "react-router-dom";
import { useState } from "react";
import { login } from "../../services/api/auth.service";
import  Error  from "@/components/shared/Error";

function LoginCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(email, password).then((response) => {
        localStorage.setItem("token", response.token);
    }).catch((error) => {
        setError(error.response.data.error);
    });
    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <form onSubmit={handleSubmit} className="min-h-[300px] w-[600px] bg-white border border-gray-200 rounded-lg">
                <span className="text-2xl font-bold text-center block mt-5">Logowanie</span>
                <div className="flex flex-col items-center justify-center mt-10 gap-5">
                    <input placeholder="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-[80%] p-2 border border-gray-300 rounded-md" />
                    <input placeholder="hasło"   value={password} onChange={(e) => setPassword(e.target.value)} className="w-[80%] p-2 border border-gray-300 rounded-md" />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Zaloguj się</button>
                </div>
                <Error message={error} onClose={() => setError("")} />
            </form>
        </div>
  );
}

export default LoginCard;