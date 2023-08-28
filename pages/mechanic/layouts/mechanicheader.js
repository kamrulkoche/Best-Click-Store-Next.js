import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../authentication/sessionAuthentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faKey, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function MechanicHeader() {
    const [jsonData, setJsonData] = useState(null);
    const { user, logout, checkUser } = useAuth();
    const router = useRouter();
    //const SessionStorage = sessionStorage.getItem('email');
    const LocalStorage = localStorage.getItem('email');


    useEffect(() => {
        checkSession();
    }, []);



    // function checkSession() {
    //     if (user != null) {
    //         getProfile();
    //     }
    //     else {
    //         router.push('../../best_click_store/login')
    //     }
    // }

    // function checkSession() {
    //     if (SessionStorage != null) {
    //         getProfile();
    //     }
    //     else {
    //         router.push('../../best_click_store/login')
    //     }
    // }


    function checkSession() {
        if (LocalStorage != null) {
            const session = JSON.parse(LocalStorage);
            const now = new Date();
            if(now.getTime() < session.expiry){
                getProfile();
            }
            else{
                router.push('../../best_click_store/login')
            }
            
        }
        else {
            router.push('../../best_click_store/login')
        }
    }



    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile', {
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
    };

    const handleDeleteProfile = () =>{
        let confirmAction = confirm(`Are you sure you want to delete your profile? \nThis action cannot be undone.`);
        if (confirmAction) {
            deleteProfile();
            router.push("../../best_click_store/login");
        } 
        else {
          
        }
    }

    async function deleteProfile(){
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + 'deleteprofile', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>
            <header className="navbar bg-cyan-400 ">
                <div className="w-10/12 ml-14 relative">
                    <div >
                        <Link href={`../pages/mechanichome`}><Image src="/images/logo.png" alt="logo.png" width={150} height={80} /></Link>
                    </div>
                    
                </div>
                {/* <div className="flex-1">
                    <form >
                        <div className='relative'>
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <button ><Image src="/images/search.jpg" alt="search.jpg" width={20} height={20} /></button>
                            </div>
                            <input type="text" placeholder="Search here" className="input input-bordered max-w-xs pl-10" name='search' />
                        </div>
                    </form>
                </div> */}
                <div className="dropdown dropdown-end">
                    <label id='1' tabIndex={0} className="btn btn-ghost btn-circle avatar mr-4 w-40 hover:bg-transparent">
                        <div className="w-20 rounded-full">
                            {jsonData !== null && (
                                <img src={process.env.NEXT_PUBLIC_BACKEND_URL + 'profilepic/' + jsonData.profile.mechanic_profilepic} />
                            )}
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-cyan-300 rounded-box w-52">
                        <li key={1}>
                            
                            <Link href={`../profile/profile`}><FontAwesomeIcon icon={faUser} />Profile</Link>
                        </li>
                        <li key={2}>
                            <Link href={`../profile/changepass`}><FontAwesomeIcon icon={faKey} />Change Password</Link>
                        </li>
                        <li key={3}>
                            <Link href="" onClick={handleDeleteProfile} ><FontAwesomeIcon icon={faTrash} />Delete Account</Link>
                        </li>
                        <li key={4}>
                            <Link href="" onClick={handleLogout} ><FontAwesomeIcon icon={faArrowRightFromBracket} />Logout</Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )

}