import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../authentication/sessionAuthentication';

const MechanicLayout = dynamic(() => import('../layouts/mechaniclayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function MechanicHome() {

    return (
        <>
            <Title page='Mechanic Dashboard'></Title>
            <MechanicLayout>

                <section id="mechanichome" >

                    <h1 align='center'>Mechanic Dash Board</h1>

                </section>
            </MechanicLayout>
        </>
    )
}