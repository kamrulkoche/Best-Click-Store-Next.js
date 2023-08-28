import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const login = (email, cookie) => {
        console.log(email);
        setUser({ email, cookie });
    };



    const checkUser = () => {
        if (user.email != null && user.cookie != null) {
            return true;
        }
        else {
            return false;
        }
    };

    const logout = () => {

        doSignOut()
    };
    async function doSignOut() {
        try {
            const response = await axios.post("http://localhost:3000/admin/logout",
                {
                    withCredentials: true
                }
            );
            console.log(response)
            setUser(null);
            document.cookie = null;
            localStorage.clear();

            router.push('sign_in');

        } catch (error) {
            console.error('error failed: ', error);
        }
    }
    return (
        <AuthContext.Provider value={{ user, login, logout, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => useContext(AuthContext);