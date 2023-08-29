import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../authentication/sessionAuthentication';



const MessageLayout = dynamic(() => import('../layouts/messagelayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function Message() {
    const [jsonData, setJsonData] = useState(null);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const [customerProfile, setCustomerProfile] = useState(null);
    const [ids, setIds] = useState([]);
    const [receiverCustomer, setReceiverCustomer] = useState([]);
    const [mechanicProfile, setMechanicProfile] = useState([]);
    
    const sendercustomerid = [];
    const receivercustomerid = [];
    const customerId = [];
    const id = customerId;
    useEffect(() => {
        async function fetchData() {
            await getProfile();
            await getMessages();
        }
        fetchData();
    }, []);

    useEffect(()=>{
        fetchCustomerProfiles();
    },[customerId]);

    
    // const fetchCustomerProfiles = async () => {
    //     try {
    //         const profiles = await Promise.all(
    //             customerId.map(async (id) => {
    //                 const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `customer/${id}`, {
    //                     withCredentials: true
    //                 });
    //                 return response.data;
    //             })
    //         );
    //         setCustomerProfile(profiles);
    //         console.log("Customer Profiles", profiles);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     if (customerId.length > 0) {
    //         fetchCustomerProfiles();
    //     }
    // }, [customerId]);


    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile', {
                withCredentials: true
            });
            const jsonData = response.data;
            setMechanicProfile(jsonData);

            console.log("Mechanic Profile", jsonData);

        } catch (error) {
            console.error(error);
        }
    }



    async function fetchCustomerProfiles() {
        const promises = customerId.map(id => getCustomerProfile(id));
        try {
            const profiles = await Promise.all(promises);
            setCustomerProfile(profiles);
            //console.log("Customer Profiles", profiles);
        } catch (error) {
            console.error(error);
        }
    }


    async function getCustomerProfile(id) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `customer/${id}`, {
                withCredentials: true
            });
            const jsonData = response.data;
            return jsonData;

        } catch (error) {
            console.error(error);
        }
    }




    const getMessages = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'showmessages', {
                withCredentials: true
            });
            const data = await response.data
            const jsonData = await data.map(mechanic => mechanic);
            const sendmessage = await jsonData.map(mechanic => mechanic.sendmessage);
            const receivemessage = await jsonData.map(mechanic => mechanic.receivemessage);
    
            console.log("data", data);
            console.log("jsonData", jsonData);
            console.log("sendmessage", sendMessage);
            console.log("receivedmessage", receiveMessage);
            setSendMessage(sendmessage);
            setReceiveMessage(receivemessage);
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };
    

    

    return (
        <>
            <Title page='Edit Profile'></Title>
            <MessageLayout>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        <section className="navigation w-full float-left bg-cyan-200 pb-20 relative" >
                            {/* Page content here */}


                        </section>

                    </div>
                    {jsonData !== null && sendMessage !== null && receiveMessage !== null && (
                        <div>
                            {console.log("send Message",sendMessage)}
                            {sendMessage.map(receiver => (receiver.map(chat => {
                                if (!receivercustomerid.includes(chat.receivercustomer.id)) {
                                    receivercustomerid.push(chat.receivercustomer.id);
                                    return <span>{chat.receivercustomer.id}</span>;
                                }
                                return null;
                            }

                                //   receivercustomerid.push(chat.receivercustomer.id)
                            )))}
                            {console.log("receive message",receiveMessage)}
                            {receiveMessage.map(sender => (sender.map(chat => { 
                                if (!sendercustomerid.includes(chat.sendercustomer.id)) {
                                    sendercustomerid.push(chat.sendercustomer.id);
                                    return <span>{chat.sendercustomer.id}</span>;
                                }
                                return null;
                            }

                            )))}
                        </div>
                    )}
                    {sendercustomerid.map(id => {
                        console.log(id)
                        if (!customerId.includes(id)) {
                            customerId.push(id);
                        }
                        return null;
                    })}

                    {receivercustomerid.map(id => {
                        if (!customerId.includes(id)) {
                            customerId.push(id);
                        }
                        return null;
                    })}
                    {console.log("sendercustomerid", sendercustomerid)}
                    {console.log("receivercustomerid", receivercustomerid)}
                    {console.log("customerid", customerId)}
                    {console.log("customerid", id)}
                    {customerId.map(id => {
                        // setIds(id);
                        
                    })}
                    
                    








                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="nav w-60 h-full bg-cyan-300 text-base-content">
                            {/* Sidebar content here */}
                            {customerProfile != null &&(
                                
                            <li key={1} className="hover:bg-transparent">
                                {console.log("customer Profile",customerProfile)}
                                <Link href={`../profile/`}>

                                    <div className="p-2">
                                        <label id='1' tabIndex={0} className="btn btn-ghost btn-circle avatar  w-18 hover:bg-transparent">
                                            <div className="w-12 rounded-full float-left">
                                                <img src={process.env.NEXT_PUBLIC_BACKEND_URL + 'customerprofilepic/'} />
                                            </div>
                                            <div className="float-left">

                                            </div>
                                        </label>
                                    </div>

                                </Link>
                            </li>
                            )}
                        </ul>
                    </div >
                </div >

            </MessageLayout >
        </>
    )
}