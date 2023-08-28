import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../session/session';

const Layout = dynamic(() => import('../Index Layout/layout'), { ssr: false, })


const Title = dynamic(() => import('../Index Layout/title'), { ssr: false, })

export default function Sign_In() {



    const {login}=useAuth();

    const router = useRouter();
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');



    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };


    const handleClick = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email or Password Error ');
        }
        else if (!isValidEmail(email)) {
            setError('Invalid email address');
        }
        else {
            const res = await dosignIn(email, password);
            console.log(res);
           
        }
    };

    async function dosignIn(email, password) {
        try {

            const response = await axios.post('http://localhost:3000/employee/signin', {

                email,

                password

            }, {

                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

                withCredentials: true

            });

            if (response.data == true) {

                console.log("cookie: " + document.cookie);

                login(email, document.cookie);
                localStorage.setItem("email",email);

                router.push('./dashboard');

            }

            else {

                setError('Email or Password is incorrect');

            }



            console.log("response: " + response)



            console.log(response.data)

            return response.data;

        }
        catch (error) {
            console.error('Login faild:', error);
        }
    }

    const isValidEmail = (email) => {
        const emailPattern = /^\S+@\S+\.\S+$/;
        return emailPattern.test(email);
    }


    return (

        <>
            <Title page="Sign_In"></Title>
            <Layout>
            


                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                            Sign in
                        </h1>
                        <form className="mt-6" onSubmit={handleClick}>
                            <div className="mb-2">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id=""
                                    value={email}
                                    placeholder='Email'
                                    onChange={handleChangeEmail}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    for="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="Password"
                                    id=""
                                    value={password}
                                    placeholder='Password'
                                    onChange={handleChangePassword}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            {/* <!-- Remember me checkbox --> */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck3"
                                        defaultChecked
                                    />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="exampleCheck3"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <a
                                href="forgot_password"
                                className="text-xs text-purple-600 hover:underline"
                            >
                                Forget Password?
                            </a>
                            <div>
                                {error && <p className=" text-center py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-purple-600" >{error}</p>}
                            </div>
                            <div className="mt-6">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"

                                    button onClick={handleClick}>
                                    Login
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-xs font-light text-center text-gray-700">
                            {" "}
                            Don't have an account?{" "}
                            <a
                                href="sign_up"
                                className="font-medium text-purple-600 hover:underline"
                            >
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

            </Layout>







        </>
    );
}


