import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from "../mechanic/authentication/sessionAuthentication";

const Layout = dynamic(() => import('../best_click_store/layout/layout'), {
    ssr: false,
})

const Title = dynamic(() => import('../best_click_store/layout/title'), {
    ssr: false,
})

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    let formIsValid = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form validation
        if (!email) {
            setEmailError('Email is required');
            formIsValid = false;
        }
        else {
            setEmailError("");
            setError("");
        }

        if (!password) {
            setPasswordError('Password is required');
            formIsValid = false;
        }
        else {
            setPasswordError("");
            setError("");
        }


        if (formIsValid) {
            const res = await doLogin(email, password);
            console.log(res);
        }
    };




    function setLocalStorageWithExpiry(key, value, expiry) {
        const now = new Date();
        const item = {
          value: value,
          expiry: now.getTime()+expiry,
        };
        localStorage.setItem(key, JSON.stringify(item));
    }


    async function doLogin(email, password) {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'login', {
                email,
                password
            }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true
            });
            if (response.data == true) {
                console.log("cookie: " + document.cookie);
                login(email, document.cookie);
                router.push('../mechanic/pages/mechanichome');
                //sessionStorage.setItem('email', email);
                const expiry = 3600 * 1000;
                setLocalStorageWithExpiry('email', email,expiry);
            }
            else {
                setError('Email or Password is incorrect');
            }
            return response.data;
        }
        catch (error) {
            if (error.response.status == 404) {
                setError("Email or Password is incorrect");
                formIsValid = false;
            } else {
                console.log("Error", error);
            }
        }
    }



    return (

        <>
            <Title page='Login'></Title>
            <Layout>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <div className="login">
                            <h1 align='center'>Login</h1>

                            <label htmlFor='email'>Email</label>
                            <input type='text' name='email' id='email' onChange={handleChangeEmail} placeholder="Type your Email" className="input" />
                            <br />{emailError && <div className="error">{emailError}</div>}

                            <label htmlFor='password'>Password</label>
                            <input type='password' name='password' id='password' onChange={handleChangePassword} placeholder="Type Your Password" className="input" />
                            <br />{passwordError && <div className="error">{passwordError}</div>}
                            {error && <div className="error">{error}</div>}
                            <Link href='./forgetpass'>Forget Password?</Link><br />

                            <p align="center"><button type="submit" name="login" className="btn">Login</button></p>
                            <p align='center'>Don't have an account?<br /><Link href='./mechanic_registration'>Register now!</Link></p>
                        </div>
                    </div>
                </form>
            </Layout>
        </>
    )
}