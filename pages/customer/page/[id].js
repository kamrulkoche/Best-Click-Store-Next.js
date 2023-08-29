import dynamic from "next/dynamic";

import Productlayout from '../layout/productlayout';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
const Title = dynamic(() => import('../../best_click_store/layout/title'), {
    ssr: false,
})
const Clayout = dynamic(() => import('../layout/clayout'), {
    ssr: false,
})
export default function Home() {
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    async function fetchData() {
        const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `getproduct/${id}`);
        console.log("RES", res.data);
        setProduct(res.data);
    }

    



    return (
        <>
            <Title page="Add to Cart"></Title>
            <Clayout>

                {product !== null && (


                    <div className="flex flex-col justify-center items-center mb-8 mt-4">
                        <div>
                            <h1 align="center" className="text-2xl p-4">{product.productname}</h1>
                            <img src={process.env.NEXT_PUBLIC_BACKEND_URL + `productpic/${product.picture}`} height="250" width="250" />
                        </div>
                        <div className="max-w-w-100 block">
                            <p >Price: ${product.productprice} </p>
                            <p>Category: ${product.category}</p>
                        </div>
                        
                    </div>

                )}

            </Clayout>




        </>

    )
}