import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

import axios from "axios";

import { useRouter } from 'next/router';

const Layout = dynamic(() => import('../Index Layout/layout'), { ssr: false, })


const Title = dynamic(() => import('../Index Layout/title'), { ssr: false, })



export default function ID() {

  const [profile, setProfile] = useState(null);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {

    if (id) {

      fetchData();

    }

  }, [id]);


  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const handleUpdate = async () => {
    try {
      const updatedProduct = { name, price, discount };
      await axios.put(`http://localhost:3000/employee/updateproduct/${id}`, updatedProduct);
      router.push("../Template/product_view");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };










  async function fetchData() {



    const res = await axios.get(`http://localhost:3000/employee/findproduct/${id}`);

    console.log("RES", res.data);

    const a = res.data;
    setProfile(res.data);

    const b = a[0].name;
    const c = a[0].price;
    const d = a[0].discount;
    setName(b);
    setPrice(c);
    setDiscount(d);
    console.log(b);
  }




  const array = Array.isArray(profile); console.log(profile);
  return (

    <>
      <Title page="Edit Product"></Title>
      <Layout>
      {profile !== null && (
        <div align="center">

          {Array.isArray(profile) ? (
            <div>

              <ul>
                {profile.map((item) => (


                  <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-600/40 ring ring-2 ring-black-600 lg:max-w-xl">
                      <h1 className="text-3xl font-semibold text-center text-black-700  uppercase decoration-wavy">
                        Edit  Product
                      </h1>


                      <div className="mb-2">
                        <div align="left" className="block text-sm font-semibold text-gray-800">Name</div>
                        <input
                          type="text"
                          name="name"
                          defaultValue={item.name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>



                      <div className="mb-2">
                        <div align="left" className="block text-sm font-semibold text-gray-800">Price</div>
                        <input
                          type="text"
                          name="price"
                          defaultValue={item.price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>


                      <div className="mb-2">
                        <div align="left" className="block text-sm font-semibold text-gray-800">Discount</div>
                        <input
                          type="text"
                          name="discount"
                          defaultValue={item.discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>

                      <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-black-600"

                          onClick={handleUpdate}>UPDATE</button>
                      </div>



                    </div>

                  </div>

                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p>Response is an object:</p>
              <p>{profile}</p>
            </div>
          )}
        </div>
      )}



</Layout>

    </>



  );
}