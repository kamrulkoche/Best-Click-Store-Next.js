import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../auth/sessionauth";
import { useRouter } from "next/router";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import React from "react";
export default function Cheader() {
    const [jsonData, setJsonData] = useState(null);
    const [cart, setCart] = useState(null);
    const [size, setSize] = useState(null);
    const { user, logout, checkUser } = useAuth();
    const router = useRouter();
    const session = localStorage.getItem("email");

    useEffect(() => {
        checkSession();
        getCartByAdmin();
    }, []);



    function checkSession() {
        if (session != null) {
            getProfile();
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

    async function getCartByAdmin() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'cart', {
                withCredentials: true
            });
            console.log("cart",response.data);
            const len = response.data.length;
            setSize(len);
            setCart(response.data);



        } catch (error) {
            console.error(error);
        }
    }


    const handleLogout = () => {
        logout();
    };
    return (
        <>
        {jsonData !==null &&(
            <header>
                
                <div className="navbar bg-primary-content">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link href="../profile/editprofile">Edit Profile</Link>  </li>
                                <li><Link href="../profile/cpicture">Change Profile picture</Link> </li>
                                <li><Link href="../profile/cpass">Change Password</Link></li>
                                <li><Link href="../page/dashboard">Homepage</Link></li>
                                <li><Link href="../page/cart">Add to Cart</Link></li>
                                <li><Link href="../page/orders">My Orders</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <Link href='../page/dashboard'><Image src="/images/logo.png" alt="logo.png" width={200} height={100} ></Image></Link>
                    </div>

                    <div class="navbar-end">
                        <button class="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

                        </button>
                    </div>
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    <span className="badge badge-xs badge-primary indicator-item"></span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow">
                                <div className="card-body">
                                    <div className="alert alert-info">
                                        <span>New mail arrived.</span>
                                    </div>
                                    <div className="alert alert-success">
                                        <span>Message sent successfully.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{size}</span>
                                </div>
                            </label>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                                <div className="card-body">
                                    <span className="font-bold text-lg">{size} Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">
                                            <Link href="../page/cart">View cart</Link></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                 
                                    <img src={process.env.NEXT_PUBLIC_BACKEND_URL + 'profilepicture/' + jsonData.profile}/>
                                </div>
                            </label>

                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <Link href="../profile/profile">Profile</Link>
                                </li>
                                <li><Link href="../profile/settings">Settings</Link>    </li>
                                <li> <Link href="" onClick={handleLogout}>Logout</Link></li>
                            </ul>
                        </div>
                    </div>


                </div>
               
            </header>
         )}
        </>
    )

}