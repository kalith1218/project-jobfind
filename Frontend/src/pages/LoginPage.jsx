import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";

import api from "../api/axios";

export default function LoginPage(){

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    async function handleSubmit(e){

        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(
            formData
        );

        try{

            const res = await api.post(
                "/accounts/login/",
                data
            );

            login(res.data);

            navigate("/jobs");

        }
        catch(err){
            console.log(err)
            alert(
                "Invalid Credentials"
            );
        }
    }

    return(
    <>

    <Navbar/>

        <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-2xl border space-y-5"
>

    <h2 className="text-3xl font-bold text-center text-gray-800">
        Welcome Back
    </h2>

    <input
        name="username"
        placeholder="Username"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
    >
        Login
    </button>

</form>
</>
    );
}