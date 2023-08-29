import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../authentication/sessionAuthentication';
export default function MechanicNavigation({children}) {
    const router = useRouter();
    const { user } = useAuth();
    // useEffect(() => {
    //     fetchEmail();
    // }, []);


    //Get email from url
    // async function fetchEmail() {
    //     try {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         const emails = urlParams.get('email');
    //         setEmail(emails);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    //Back to home route
    const handleBack = () => {
        router.push('../pages/mechanichome');
    };

    

    return (
      <>
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                <section className="navigation w-full float-left bg-cyan-200 pb-20 relative" >
                    {/* Page content here */}
                    {children}
                    <div className="detaills w-full float-left flex flex-col items-end justify-right absolute bottom-5 right-5">
                        <button onClick={handleBack} className="btn bg-cyan-400 hover:bg-cyan-300" >Back</button>
                    </div>
                </section>
                            
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="nav w-60 h-full bg-cyan-300 text-base-content">
                    {/* Sidebar content here */}
                    <li className="p-4 hover:bg-cyan-500"><Link href={`../messages/message`}>Message</Link></li>
                    <li className="p-4 hover:bg-cyan-500"><Link href={`../service/servicerequest`}>Service Request</Link></li>
                    <li className="p-4 hover:bg-cyan-500"><Link href={`./mechanics`}>Mechanics</Link></li>
                </ul>
            </div>
        </div>
      </>
    )
  }