import Link from 'next/link';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../auth/sessionauth';
import axios from 'axios';
const Title = dynamic(() => import('../../best_click_store/layout/title'), {
    ssr: false,
})
const Clayout = dynamic(() => import('../layout/clayout'), {
    ssr: false,
})
export default function Profile() {
    const [jsonData, setJsonData] = useState(null);

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

    return (

        <>
            <Title page="Profile"></Title>
            <Clayout>
                {jsonData !== null && (
                    <div>
                        <h1 align="center">Profile</h1>
                        <table align="center">
                            <tr>
                                <td>
                                    <form>
                                        <tr>
                                            <td>
                                                Name:

                                            </td>
                                            <td>
                                            {jsonData.name}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Email:

                                            </td>
                                            <td>
                                            {jsonData.email}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Address:
                                            </td>
                                            <td>
                                            {jsonData.address}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Phone number:
                                            </td>
                                            <td>
                                            {jsonData.phone}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Gender:
                                            </td>
                                            <td>
                                            {jsonData.gender}
                                            </td>
                                        </tr>

                                        &nbsp; &nbsp;
                                        <tr>
                                            <td align="center">
                                                <Link href={'./editprofile'}>Edit Profile</Link>
                                            </td>
                                        </tr>



                                    </form>
                                </td>
                            </tr>

                        </table>
                    </div>
                )}

            </Clayout>






        </>

    )
}