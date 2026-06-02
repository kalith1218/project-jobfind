import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                <h1 className="inline-block text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                  FindJob
                 </h1>

                <nav className="flex items-center gap-6 font-medium">

                    <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg transition duration-200 ${
                                isActive
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                            }`
                        }
                    >
                        Jobs
                    </NavLink>

                    {user?.role === "candidate" && (
                        <NavLink
                            to="/candidate-dashboard"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg transition duration-200 ${
                                    isActive
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    )}

                    {user?.role === "employer" && (
                        <NavLink
                            to="/employer-dashboard"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg transition duration-200 ${
                                    isActive
                                        ? "bg-green-100 text-green-700"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
                                }`
                            }
                        >
                            Employer
                        </NavLink>
                    )}

                </nav>

                <div className="flex items-center gap-4">

                    <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">

                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                            {user?.username?.charAt(0)?.toUpperCase()}
                        </div>

                        <span className="font-medium text-gray-700">
                            {user?.username}
                        </span>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg shadow-md transition duration-200"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </header>
    );
}