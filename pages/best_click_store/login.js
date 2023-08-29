
import Link from 'next/link';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../customer/auth/sessionauth';
import axios from 'axios';
import React from 'react';
const Title= dynamic(()=>import('./layout/title'),{
  ssr:false,
})
const Layout= dynamic(()=>import( './layout/layout'),{
  ssr:false,
})
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form validation
        if (!email || !password) {
        setError('Email and password are required');
        } else if (!isValidEmail(email)) {
        setError('Invalid email address');
        } 
        else {
            const res = await doLogin(email,password);
            console.log(res);
        }
    };
    

    async function doLogin(email,password){
        try{
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'login',{
                email,
                password
            },{
                withCredentials: true
            });
            if (response.data == true) {
                console.log("cookie: " + document.cookie);
                login(email, document.cookie);
                localStorage.setItem("email",email);
                router.push('../customer/page/dashboard');
            }
            else {
                setError('Email or Password is incorrect');
            }

            console.log("response: " + response)

            console.log(response.data)
            return response.data;
        }
        catch(error){
            console.error('Login Failed:', error)
        }
    }




    const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
    }


  return (

    <>
    <Title page="Login"></Title>
   <Layout>
    <h1 align="center" className='text-yellow-300 text-4xl'>Login</h1><br></br>
    <form onSubmit={handleSubmit}>

    
    <table align="center">
    <tr>
        <td>
        &nbsp;<input type="text" placeholder="Email" className="input input-bordered input-secondary w-full max-w-xs"  name="email" onChange={handleChangeEmail}></input>
        </td>
    </tr>
    <tr>
        <td>
        &nbsp;<input type="text" placeholder="Password" className="input input-bordered input-secondary w-full max-w-xs" name="password" onChange={handleChangePassword}></input>
        </td>
    </tr>
    <tr>
        <td>
        {error && <p>{error}</p>}
        </td>
    </tr>
    <br></br>
    <tr>
        <td  align="center">
        <input type="submit" className="btn btn-warning" value="Login"></input>
        </td>
    </tr>

   <br></br>
    </table>
    </form>
    
   </Layout>




   
   
   </>
   
  )
}
