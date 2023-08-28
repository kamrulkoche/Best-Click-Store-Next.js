import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

const MechanicLayout = dynamic(() => import('../layouts/mechaniclayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function ID() {
    const [profile, setProfile] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (id) {
            fetchData();
        }


    }, [id]);

    async function fetchData() {

        const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `customer/${id}`);
        console.log("RES", res.data);
        setProfile(res.data);
    }


    return (
        <>
            <Title page='Add Service'></Title>
            <MechanicLayout>
                {profile !== null && (
                    <div>
                        <h1>{profile.id}</h1>
                        <p>{profile.name}</p>
                    </div>
                )}
            </MechanicLayout>
        </>

    );
};




