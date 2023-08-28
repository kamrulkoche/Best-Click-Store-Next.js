import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const Layout = dynamic(() => import('../Index Layout/layout'), { ssr: false, })
const Title = dynamic(() => import('../Index Layout/title'), { ssr: false, })


export default function Sign_Up() {
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

    const [success, setSuccess] = useState('')
    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('fname', data.fname);
        formData.append('lname', data.lname);
        formData.append('gender', data.gender);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('password', data.password);
        formData.append('filename', data.filename[0]);
        console.log(formData);
        try {
            const response = await axios.post("http://localhost:3000/admin/signup",
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });


            setSuccess(' Successfully');
            reset();

        }
        catch (error) {
            console.log(error.response.data.message);

            setSuccess(' unsuccessfull ' + error.response.data.message);
        }
    };

    return (
        <>
            <Title page="Sign_Up"></Title>
            <Layout>
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-2 m-auto bg-green rounded-md  ring  ring-black-600 lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-black-700 decoration-wavy">
                            Sign Up
                        </h1>

                        <br></br>



                        <form onSubmit={handleSubmit(onSubmit)}>



                            <div className="mb-2">

                                <label
                                    for="fname"
                                    className="block text-sm font-semibold text-black-800"
                                >
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name=""
                                    id="fname"

                                    class=""
                                    placeholder='First Name'
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required=""
                                    {...register('fname', { required: true })}
                                />

                                {errors.fname &&
                                    <p id="" class=""><span class="">First Name is required</span></p>
                                }

                            </div>




                            <div className="mb-2">

                                <label
                                    for="lname"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name=""
                                    id="lname"
                                    class=""
                                    placeholder='Last Name'
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required=""
                                    {...register('lname', { required: true })}
                                />

                                {errors.lname &&
                                    <p id="" class=""><span class="">Last Name is required</span></p>
                                }

                            </div>

                            <div >
                                <label
                                    for="lname"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Gender
                                </label>


                           

                                {errors.gender &&
                                    <p id="" class=""><span class="">Gender is required</span></p>
                                }

                            </div>



                            <div  className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40">

                                <tr>
                                   
                                    <td>
                                        <label>

                                            <select className="select select-bordered select-sm w-full max-w-xs" {...register('gender', { required: true })}>

                                                <option disabled selected>Select Gender</option>

                                                <option   id="gender"> Male</option>

                                                <option   id="gender">Female</option>

                                                <option>Others</option>

                                            </select>

                                        </label>
                                    </td>
                                </tr>
                                {errors.gender &&
                                    <p id="" class=""><span class="">Gender is required</span></p>
                                }
                            </div>





                            <div >

                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name=""
                                    id="email"
                                    class=""
                                    placeholder='name@company.com'
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required=""
                                    {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}

                                />

                                {errors.email && (
                                    <p>
                                        {errors.email.type === 'required'
                                            ?
                                            <p id="" class=""><span class="">Email is required</span></p>

                                            :
                                            <p id="" class=""><span class="" >Invalid email address</span></p>
                                        }
                                    </p>
                                )}

                            </div>

                            <div>
                                <label
                                    for="phone"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Phone
                                </label>


                                <input
                                    type="text"
                                    name=""
                                    id="phone"
                                    class=""
                                    placeholder='Phone'
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    required=""
                                    {...register('phone', { required: true })}
                                />

                                {errors.phone &&
                                    <p id="" class=""><span class="">Phone is required</span></p>
                                }

                            </div>

                            <div>
                                <label
                                    for="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    class=""
                                    required=""
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    {...register('password', { required: true, pattern: /^\d+$/, minLength: 5 })}
                                />

                                {errors.password && (
                                    <p>
                                        {errors.password.type === 'required'
                                            ?
                                            <p id="" class=""><span class="">password is required</span></p>
                                            :
                                            <p id="" class=""><span class="">Invalid password pattern</span></p>

                                        }
                                    </p>
                                )}

                            </div>

                            <div >

                                <label class="" for="file_input" className="block text-sm font-semibold text-gray-800">Upload file</label>


                                <input
                                    type="file"
                                    name=""
                                    id="filename"
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black-400 focus:ring-black-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    class=""
                                    {...register('filename', { required: true, validate: validateFile })}
                                />

                                {errors.filename &&
                                    <p>
                                        {errors.filename.type === 'required'
                                            ?
                                            <p id="" class=""><span class="">File is required</span></p>
                                            :

                                            <p id="p" class=""><span class="">invalid file</span></p>

                                        }
                                    </p>}

                            </div>

                            <div className="mt-6">
                                < button type="submit" class=""
                                    button className="w-full px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-blackrounded-md focus:outline-none focus:bg-green-600"

                                >Submit</button>
                            </div>


                            <h3>{success}</h3>


                        </form>
                    </div>
                </div>

            </Layout>
        </>
    )
}
