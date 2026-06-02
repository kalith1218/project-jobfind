import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RegisterPage(){

    const navigate = useNavigate();

    async function handleSubmit(e){

        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(
            formData
        );

        try{

            await api.post(
                "/accounts/register/",
                data
            );

            alert(
                "Registered Successfully"
            );

            navigate("/login");

        }
        catch(err){
            console.log(err)
            alert(
                "Registration Failed"
            );
        }
    }

    return(
        <>
       <Navbar/>

        <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto mt-16 bg-white shadow-2xl rounded-2xl p-8 space-y-5 border"
>

    <h2 className="text-3xl font-bold text-center text-gray-800">
        Create Account
    </h2>

    <input
        name="username"
        placeholder="Username"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <input
        name="email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />

    <select
        name="role"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    >
        <option value="candidate">
            Candidate
        </option>

        <option value="employer">
            Employer
        </option>
    </select>

    <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
    >
        Register
    </button>

</form>
 </>


    );
}