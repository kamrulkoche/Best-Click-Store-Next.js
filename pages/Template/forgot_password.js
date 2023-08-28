import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const Title = dynamic(() => import('../Index Layout/title'), { ssr: false, })
const Layout = dynamic(() => import('../Index Layout/layout'), { ssr: false, })

export default function Forgot_password() {
    const router = useRouter();
    const [email, setEmail] = useState(' ');
    const [error, setError] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        
        if (!isValidEmail(email)) {
            setError('Invalid email address');
        }
        else {
            const res = await doforgotpass(email);
            console.log(res);
        }
    };



    async function doforgotpass(email) {
        try {

            const response = await axios.post('http://localhost:3000/employee/forgetPassword', {

                email,

            }, {

                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

                withCredentials: true

            });

            console.log(response.data);
            if(response.data == "Email not found!") {
                setError('E-mail address not found!');
            }
            else {
                router.push('varify_password');
            }
        }
        catch (error) {
            console.error('Forget Pass Error:', error);
        }
    }

    const isValidEmail = (email) => {
        const emailPattern = /^\S+@\S+\.\S+$/;
        return emailPattern.test(email);
    }




    return (
        <>
            <Title page="Forgot Password"></Title>
            <Layout>
                <fieldset>
                  

                    <form onSubmit={handleClick}>
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-600/40 ring ring-2 ring-black-600 lg:max-w-xl">
                                        <h1 className="text-3xl font-semibold text-center text-black-700  uppercase decoration-wavy">
                                        Forgot Password
                                        </h1>
                                        <div className="mb-2">
                                            <div align="left" className="block text-sm font-semibold text-gray-800">Email</div>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={email}
                                                required minlength="8"
                                                placeholder='Email'
                                                onChange={handleChangeEmail}
                                                className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                            />
                                        </div>
                                        <div>
                                {error && <p className=" text-center py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus:bg-purple-600" >{error}</p>}
                            </div>
                                        <div className="mb-2">
                                            <a rel="noopener noreferrer" href="" aria-label="" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400">
                                                <button className="btn btn-active btn-accent">Submit</button>
                                            </a>
                                        </div>
                                        </div>
                    {/* <table align="center">
                        <tbody>
                            <div>
                            <tr>

                                
                                <td>Email</td>
                                <td>
                                <input
                                    type="email"
                                    name="email"
                                    id=""
                                    value={email}
                                    required minlength="8"
                                    placeholder='Email'
                                    onChange={handleChangeEmail}
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                                </td>
                            </tr>
                            </div>

                            <div>
                            {error && <p>{error}</p>}
                            <tr>
                                <td className="block w-full px-4 py-2 mt-2 text-black-700 bg-white focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                    
                                <button onClick={handleClick}>Submit</button>
                                </td>
                            </tr>
                            </div>
                        </tbody>
                    </table> */}
                    </form>
                </fieldset>
            </Layout>
        </>
    )
}
