import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../session/session';

const Layout = dynamic(() => import('../Index Layout/layout'), { ssr: false, })
const Title = dynamic(() => import('../Index Layout/title'), { ssr: false, })
export default function Sign_In() {

    const { login } = useAuth();
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

            const response = await axios.post('http://localhost:3000/admin/signin', {

                email,

                password

            }, {

                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

                withCredentials: true

            });

            if (response.data == true) {

                console.log("cookie: " + document.cookie);

                login(email, document.cookie);
                localStorage.setItem("email", email);

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
                    <div className="w-80 p-6 m-auto  rounded-md shadow-xl  ring ring-2 ring-black lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-black decoration-wavy">
                            Login
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
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md  focus:outline-none  "
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
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md  focus:outline-none "
                                />
                            </div>

                            <a
                                href="forgot_password"
                                className="text-xs text-black hover:underline"
                            >
                                Forget Password?
                            </a>
                            <div>
                                {error && <p className=" text-center py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-purple-600" >{error}</p>}
                            </div>
                            <div className="mt-6">
                                <button className="w-50 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md focus:outline-none "

                                    button onClick={handleClick}>
                                    Login
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-xs font-light text-center text-gray-700">

                            <a
                                href="sign_up"
                                className="font-medium text-black hover:underline"
                            >
                                Create account?
                            </a>
                        </p>
                    </div>
                </div>

            </Layout>
        </>
    );
}

