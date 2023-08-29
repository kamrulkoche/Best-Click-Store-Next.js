import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import axios from "axios";

const MechanicLayout = dynamic(() => import('../layouts/mechaniclayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function AddService() {
    const [jsonData, setJsonData] = useState();
    const [service, setService] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);
    const [servicesError, setServicesError] = useState();
    const handleServices = (e) => {
        const serviceId = parseInt(e.target.value);
    
        if (e.target.checked) {
            // Add the service ID to the checkboxes array
            setCheckboxes([...checkboxes, serviceId]);
        } else {
            // Remove the service ID from the checkboxes array
            const updatedServices = checkboxes.filter(item => item !== serviceId);
            setCheckboxes(updatedServices);
            console.log(updatedServices);
        }
    };

    useEffect(() => {
        getProfile();
        console.log("Mechanic Service Id", checkboxes);
    }, []);


    useEffect(() => {
        getServices();

    }, []);




    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
            const serviceIds = jsonData.services.map(service => service.service_id);
            setCheckboxes(serviceIds);

            console.log("Mechanic Service Ids", serviceIds);


        } catch (error) {
            console.error(error);
        }
    }


    async function getServices() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'allservices', {
                withCredentials: true
            });
            const services = response.data;
            setService(services);

            console.log(services);

        } catch (error) {
            console.error(error);
        }
    }

    let formIsValid = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkboxes == []) {
            setServicesError("Select at least 1 service");
            formIsValid = false;
        }

        if (formIsValid) {
            addServices();
        }

    }


    async function addServices() {
        try {
            const data={
                service_id: checkboxes
            }
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'mechanicservice', data, {
                withCredentials: true
            });
            const service = response.data;

        } catch (error) {
            console.error(error);
        }
    }





    return (
        <>
            <Title page='Add Service'></Title>
            <MechanicLayout>
                {jsonData != null && (
                    <section  className="mechanic justify-center flex py-10">
                        
                        <form onSubmit={handleSubmit}>
                            <div id="form">
                            <h1 align='center'>Add Service</h1>
                            <label htmlFor='service'>Select service </label><br />
                            

                            {service.map((servicee) => (
                                <label key={servicee.service_id}>
                                    <input type="checkbox" name={servicee.service_name} value={servicee.service_id} defaultChecked={checkboxes.includes(servicee.service_id)} onChange={handleServices} />
                                    {servicee.service_name} <br />
                                </label>
                            ))}


                            {servicesError && <div className="error">{servicesError}</div>}
                            {servicesError && <div className="error">{servicesError}</div>}
                            <p align="center w-full"><button type="submit" name="addService" className="btn w-120">Add</button></p>
                            </div>
                        </form>
                    </section>
                )}
            </MechanicLayout>
        </>
    )
}