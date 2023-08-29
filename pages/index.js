import Link from 'next/link';
import dynamic from "next/dynamic";
import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Title= dynamic(()=>import('./best_click_store/layout/title'),{
  ssr:false,
})
const Layout= dynamic(()=>import( './best_click_store/layout/layout'),{
  ssr:false,
})

const Home = () => {
  const [jsonData, setJsonData] = useState(null);
  const router = useRouter();

  useEffect(() => {
      getProduct();
  }, []);




  async function getProduct() {
      try {
          const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'product', {
              withCredentials: true
          });
          const jsonData = response.data;
          setJsonData(jsonData);

          console.log(jsonData);

      } catch (error) {
          console.error(error);
      }
  }


  const handleCart = async (pid) => {
      router.push("./best_click_store/login")

  }


  async function addToCart(pid) {
      try {
          const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + `cart/${pid}`, {
              withCredentials: true
          });

          console.log(response.data);

      } catch (error) {
          console.error(error);
      }
  }
  return (
    <>
    <Title page="Home"></Title>
    <Layout>
    {jsonData !== null && (
                    <div className="m-4">
                        <h1 align="center">Welcome to our Page</h1>
                        {jsonData.map(product =>

                            <div className="card w-60 bg-base-100 shadow-xl flex float-left ml-4 h-80  mb-5" >
                                <Link href={`./${product.productid}`}>
                                    <figure><img src={process.env.NEXT_PUBLIC_BACKEND_URL + `productpic/${product.picture}`} height="200" width="200" className="imag" /></figure>
                                </Link>
                                <div className="card-body">
                                    <Link href={`./${product.productid}`}>
                                        <p className="text-lg">
                                            {product.productname}
                                        </p>
                                    </Link>
                                    <div className="card-actions justify-start flex-row">
                                        Category:
                                        <div className="badge badge-outline"> {product.category}</div>
                                    </div>

                                    <div className="card-actions justify-center mt-4">
                                        <button className="btn btn-primary" onClick={() => handleCart(product.productid)}>Add to cart</button>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
                )}
    </Layout>


   
   
   </>
   
  );
};
export default Home;



  
 