import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const MechanicLayout = dynamic(() => import('../layouts/mechaniclayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function ChangeProfile() {
    //input variables
    const [customer, setCustomer] = useState('');
    const [mechanic, setMechanic] = useState('');
    const [service, setService] = useState('');
    const [jsonData, setJsonData] = useState(null);
    const router = useRouter();

    //error variables
    const [profileError, setProfileError] = useState('');
    const [error, setError] = useState('');

    //handle inpute field changes start here

    const handleResponse = (e) => {

    };



    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile', {
                withCredentials: true
            });
            getServiceRequest(response.data.mechanic_id);
        } catch (error) {
            console.error(error);
        }
    }

    async function getServiceRequest(id) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `showrequest/${id}`, {
                withCredentials: true
            });

            const jsonData = response.data;
            const customer = await jsonData.map(service => service.customer);
            const mechanic = await jsonData.map(service => service.mechanic);
            const service = await jsonData.map(service => service.service);

            setJsonData(jsonData);
            setCustomer(customer);
            setMechanic(mechanic);
            setService(service);
            console.log("customer", customer);
            console.log("jsonData", jsonData);
            console.log("mechanic", mechanic);
            console.log("service", service);

        } catch (error) {
            console.error(error);
        }
    }





    return (

        <>
            <Title page='Change Profile'></Title>
            <MechanicLayout>
                {jsonData !== null && (
                    <div>
                        <h1 align='center' className="text-4xl pt-4">Service Requests</h1>

                        <div className="overflow-x-auto m-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Customer Detail</th>
                                        <th>Requested Service</th>
                                        <th>Status</th>
                                        <th>Response</th>
                                    </tr>
                                </thead>
                                {customer != null && (customer.map((c,index) =>
                                    <div>
                                        <div>
                                            <div className="overflow-x-auto">
                                                <tbody className="table">
                                                    <tr>
                                                        <td>
                                                            <div className="flex items-center space-x-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle w-12 h-12">
                                                                        <img src={process.env.NEXT_PUBLIC_BACKEND_URL + `customerprofilepic/${c.profilepic}`} />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{c.name}</div>
                                                                    <div className="text-sm opacity-50">{c.address}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {service[index].service_name}
                                                        </td>
                                                        <td>{jsonData[index].status}</td>
                                                        <th>
                                                            <button className="btn btn-ghost btn-xs">details</button>
                                                        </th>
                                                    </tr>
                                                </tbody>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </table>
                        </div>


                    </div>

                )}
            </MechanicLayout>


        </>
    )
}