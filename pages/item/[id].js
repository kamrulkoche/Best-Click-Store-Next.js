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
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');

  const handleUpdate = async () => {
    try {
      const updatemanager = { name, email, address };
      await axios.put(`http://localhost:3000/admin/updatemanager/${id}`, updatemanager);
      router.push("../Template/adduser_view");
    } catch (error) {
      console.error("Error updating manager:", error);
    }
  };



  async function fetchData() {



    const res = await axios.get(`http://localhost:3000/admin/findmanager/${id}`);

    console.log("RES", res.data);

    const a = res.data;
    setProfile(res.data);

    const b = a[0].name;
    const c = a[0].email;
    const d = a[0].address;
    setName(b);
    setemail(c);
    setaddress(d);
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
                    <div className="w-80 p-6 m-auto  rounded-md shadow-xl  ring ring-2 ring-black lg:max-w-xl">
                      <h1 className="text-3xl font-semibold text-center text-black-700  uppercase decoration-wavy">
                        Edit  User
                      </h1>


                      <div className="mb-2">
                      <div align="left" className="block text-sm font-semibold text-gray-800">Name</div>
                        <input
                          type="text"
                          name="name"
                          defaultValue={item.name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md  focus:outline-none "
                        />
                      </div>



                      <div className="mb-2">
                        <div align="left" className="block text-sm font-semibold text-gray-800">Email</div>
                        <input
                          type="text"
                          name="email"
                          defaultValue={item.email}
                          onChange={(e) => setemail(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>


                      <div className="mb-2">
                        <div align="left" className="block text-sm font-semibold text-gray-800">Address</div>
                        <input
                          type="text"
                          name="address"
                          defaultValue={item.address}
                          onChange={(e) => setaddress(e.target.value)}
                          className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>

                      <div className="mt-6">
                        <button className="w-50 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none "

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