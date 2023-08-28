import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const Title = dynamic(() => import('../Layout/title'), { ssr: false, })
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false, })


export default function Add_product() {

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



    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const validateFile = (value) => {
        const file = value[0];
        const allowedtypes = ["image/jpg", "image/png", "image/jpeg"];


        if (!allowedtypes.includes(file.type)) {
            return false;
        }
    }

    const [ID, setID] = useState('');
    useEffect(() => {
        setID(sessionStorage.getItem("id"));
    })

    const [success, setSuccess] = useState('')
    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('address', data.address);
        formData.append('admin', data.adminid);
        console.log(formData);
        try {
            const response = await axios.post("http://localhost:3000/admin/addmanager",
                formData, {
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "multipart/form-data",
                }
            });


            setSuccess(' Successfully');
            reset();

        }
        catch (error) {
            console.log(error.response.data.message);
console.log(error);
            setSuccess(' unsuccessfull ' + error.response.data.message);
        }
    };

    return (
        <>
            <Title page="Add User"></Title>
            <Layout>


                {jsonData !== null && (


                    <fieldset>
                        <h1 align="center">Add User</h1>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <table align="center">
                               
                                    <div className="mb-2">
                                        <div align="left" className="block text-sm font-semibold text-gray-800">Name</div>
                                        <input
                                            type="text"
                                            name=""
                                            id="name"
                                            class=""
                                            placeholder='Name'
                                            required=""
                                            {...register('name', { required: true })}
                                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />

                                        {errors.name &&
                                            <p id="" class=""><span class=""> Name is required</span></p>
                                        }

                                    </div>


                                    <div className="mb-2">
                                        <div align="left" className="block text-sm font-semibold text-gray-800">Email</div>
                                        <input
                                            type="text"
                                            name=""
                                            id="email"
                                            class=""
                                            placeholder='email'
                                            required=""
                                            {...register('email', { required: true })}
                                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />

                                        {errors.email &&
                                            <p id="" class=""><span class=""> email is required</span></p>
                                        }

                                    </div>


                                    <div className="mb-2">
                                        <div align="left" className="block text-sm font-semibold text-gray-800">Password</div>
                                        <input
                                            type="text"
                                            name=""
                                            id="password"
                                            class=""
                                            placeholder='password'
                                            required=""
                                            {...register('password', { required: true })}
                                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />

                                        {errors.password &&
                                            <p id="" class=""><span class=""> password is required</span></p>
                                        }

                                    </div>
                                    <div className="mb-2">
                                        <div align="left" className="block text-sm font-semibold text-gray-800">Address</div>
                                        <input
                                            type="text"
                                            name=""
                                            id="address"
                                            class=""
                                            placeholder='address'
                                            required=""
                                            {...register('address', { required: true })}
                                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />

                                        {errors.address &&
                                            <p id="" class=""><span class=""> Address is required</span></p>
                                        }

                                    </div>



                                    <div>
                                        <tr>
                                            {/* <td>adminid</td> */}
                                            <td>
                                                <input
                                                    type="number"
                                                    name=""
                                                    id="admin"
                                                    class=""
                                                    value={jsonData.id}
                                                    placeholder='Admin   '
                                                    required=""
                                                    hidden
                                                    {...register('Admin', { required: true })}
                                                />
                                            </td>

                                            <td>
                                                {errors.adminid &&
                                                    <p id="" class=""><span class="">Admin Id is required</span></p>
                                                }
                                            </td>


                                        </tr>

                                        <div className="mt-6">
                                            <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-black-600">

                                                <button type="submit" class="">Submit</button></div>
                                        </div>


                                    </div>


                                    <h3>{success}</h3>
                              
                            </table>
                        </form>
                    </fieldset>
                )
                }
            </Layout>
        </>
    )
}
