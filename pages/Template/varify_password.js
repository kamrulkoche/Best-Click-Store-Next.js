import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const Title = dynamic(() => import('../Index Layout/title'), { ssr: false, })
const Layout = dynamic(() => import('../Index Layout/layout'), { ssr: false, })

export default function Varify_password() {
    const router = useRouter();
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePin = (e) => {
        setPin(e.target.value);
    };

    const handleChangeNewpassword = (e) => {
        setPassword(e.target.value);
    };

    
    const handleClick = async (e) => {
        e.preventDefault();

        if (!pin || !password) {
            setError('Pin and New_Password are required');
        }
      
        else {
            const res = await dovarify(pin, password);

            
        }

    };


    async function dovarify(pin, password) {
        try {

            const response = await axios.patch('http://localhost:3000/employee/varifyPass', {

                pin, password

            }, {

                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

                withCredentials: true

            });

            console.log(response);
            if(response.data == "Password reseted!")
                router.push('sign_in');
            else 
                setError(response.data);
            
        }
        catch (error) {
            console.error('Forget Pass Error:', error);
        } 
    }




    return (
        <>
            <Title page="Varify Password"></Title>

            <Layout>
                {/* <fieldset>
                    <h1 align="center" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" >Varify Password</h1>

                    <form onSubmit={handleClick}>
                    <table align="center">
                        <tbody>
                            <div>
                            <tr>
                                <td   className="block w-full px-4 py-2 mt-2 text-black-700 bg-white focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">Pin</td>
                                <td>
                                    <input 
                                    type="number"
                                    name="pin"
                                    id=""
                                    value={pin}
                                    placeholder='Pin'
                                    onChange={handleChangePin}
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </td>
                            </tr>
                            </div>

                            <div>
                            <tr>
                                <td   className="block w-full px-4 py-2 mt-2 text-black-700 bg-white  focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">New Password</td>
                                <td>
                                    <input 
                                    type="text" 
                                    name="password" 
                                    id="" 
                                    value={password}
                                    placeholder='New Password'
                                    onChange={handleChangeNewpassword}
                                    className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </td>
                            </tr>
                            </div>

                            <div>
                                {error && <p>{error}</p>}
                                <tr>
                                    <td   className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40">
                                         <button onClick={handleClick}>Submit</button>
                                    </td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                    </form>
                </fieldset> */}



                <fieldset>
                  <form onSubmit={handleClick}>
                  <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-600/40 ring ring-2 ring-black-600 lg:max-w-xl">
                                      <h1 className="text-3xl font-semibold text-center text-black-700  uppercase decoration-wavy">
                                      Varify Password
                                      </h1>
                                      <div className="mb-2">
                                          <div align="left" className="block text-sm font-semibold text-gray-800">Pin</div>
                                          <input
                                              type="number"
                                              name="pin"
                                              id=""
                                              value={pin}
                                              placeholder='Pin'
                                              onChange={handleChangePin}
                                              className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                          />
                                      </div>
                                      <div className="mb-2">
                                          <div align="left" className="block text-sm font-semibold text-gray-800">New Password</div>
                                          <input
                                              type="text" 
                                              name="password" 
                                              id="" 
                                              value={password}
                                              placeholder='New Password'
                                              onChange={handleChangeNewpassword}
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
            
                  </form>
              </fieldset>
         
            </Layout>
        </>
    )
}
