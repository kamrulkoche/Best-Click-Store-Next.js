import dynamic from 'next/dynamic';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../session/session';
import { useRouter } from 'next/router';


const Title = dynamic(() => import('../Layout/title'), { ssr: false, })
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false, })
import { router } from 'next/router';


export default function Dashboard() {

    const { logout } = useAuth();
    const router = useRouter();


    const image = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {

        getProfile();

    }, []);

    async function getProfile() {
        try {
            const response = await axios.get('http://localhost:3000/admin/profile', {
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
            <Title page="Dashboard"></Title>

            <Layout>

       
            </Layout>
        </>
    )
}



