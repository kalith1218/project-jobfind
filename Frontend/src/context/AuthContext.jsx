import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}){

    const [user,setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const login = (data) => {

        localStorage.setItem(
            "access",
            data.access
        );

        localStorage.setItem(
            "refresh",
            data.refresh
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setUser(data.user);
    };

    const logout = () => {

        localStorage.clear();

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}