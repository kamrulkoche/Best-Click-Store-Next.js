import { useAuth } from "../session/session";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Navigation() {

    const [jsonData, setJsonData] = useState(null);

    const { user, logout, checkUser } = useAuth();
    const Session=localStorage.getItem("email")

    const router = useRouter();
    useEffect(() => {
        checkSession();
    }, []);


    function checkSession() {
        if (Session != null) {
            getProfile();
        }
        else {
            router.push('./sign_in')
        }
    }


    async function getProfile() {
        try {
            const response = await axios.get('http://localhost:3000/employee/profile', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }
    const handleLogout = () => {
        logout();
        router.push('./sign_in');
    };

    return (
        <>

        </>
    )
}

