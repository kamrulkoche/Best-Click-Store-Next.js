import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [jsonData, setJsonData] = useState(null);
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
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'logout',
                {
                    withCredentials: true
                }
            );
            setUser(null);
            document.cookie = null;
            const SessionStorage = sessionStorage.clear();
            const LocalStorage = localStorage.clear();
            console.log("Session Storage",SessionStorage);
            console.log("Local Storage",LocalStorage);
            router.push('../../best_click_store/login');


        } catch (error) {
            console.error('error failed: ', error);
        }
    }


    const profile = () => {

        getProfile()
    };



    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile' ,{
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }



    




    return (
        <AuthContext.Provider value={{ user, login, logout, checkUser, profile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);