import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const MechanicLayout = dynamic(() => import('../layouts/mechaniclayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function Profile() {
    const [jsonData, setJsonData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getProfile();
    }, []);




    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);

            console.log(jsonData);

        } catch (error) {
            console.error(error);
        }
    }



    //edit profile route
    const handleEditProfile = () => {
        router.push('./editprofile');
    };



    //change password route
    const handleChangeProfilePic = () => {
        router.push('./changeprofilepic')
    };





    return (
        <>
            <Title page='Profile'></Title>
            <MechanicLayout>

                {jsonData !== null && (
                    <div>
                        <h1 align='center' className="text-4xl mt-4">Profile</h1>
                        <div className="detaills w-8/12 float-left justify-center align-items-center flex flex-row  mt-10">
                            <div className="w-2/12 float-left">
                                <p>Name:</p><br />
                                <p>Email:</p><br />
                                <p>Phone:</p><br />
                                <p>NID:</p><br />
                                <p>Gender: </p><br />
                                <p>Address:</p><br />
                                <p>Services:</p><br />
                            </div>
                            <div className="profile w-4/12 float-left">
                                <p>{jsonData.mechanic_name}</p><br />
                                <p>{jsonData.mechanic_email}</p><br />
                                <p>{jsonData.mechanic_phone}</p><br />
                                <p>{jsonData.mechanic_nid}</p><br />
                                <p>{jsonData.mechanic_gender}</p><br />
                                <p>{jsonData.mechanic_address}</p><br />
                                <div class="grid-container">
                                    {jsonData.services.map((service) => (
                                        <div class="item">
                                            {service.service_name}
                                        </div>
                                    ))}
                                </div>
                                <ul>

                                </ul>

                                <Link href={`./addservice`}>+ Add Services </Link>
                                <br /><br />
                            </div>

                        </div>

                        <div className="detaills float-left w-4/12 mt-28">
                            <div className="image">
                                <img src={process.env.NEXT_PUBLIC_BACKEND_URL + 'profilepic/' + jsonData.profile.mechanic_profilepic} width={200} height={200}></img>
                                <button onClick={handleChangeProfilePic} className="btn mt-1 bg-cyan-400 hover:bg-cyan-300" >Change Profile Picture</button>
                            </div>
                        </div>
                        <div className="w-8/12 float-left flex flex-col items-center justify-center">
                            <button onClick={handleEditProfile} className="btn bg-cyan-400 hover:bg-cyan-300">Edit Profile</button>
                        </div>
                    </div>
                )
                }

            </MechanicLayout>
        </>
    )
}