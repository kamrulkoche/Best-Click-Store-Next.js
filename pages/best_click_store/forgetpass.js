import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Swal from 'sweetalert2'



const Layout = dynamic(() => import('../best_click_store/layout/layout'), {
    ssr: false,
})

const Title = dynamic(() => import('../best_click_store/layout/title'), {
    ssr: false,
})

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const router = useRouter();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
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
        }

        if (formIsValid) {
            const res = await checkMail(email);
            console.log(res);
        }
    };




    async function checkMail(email) {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'forgetpass', {
                email
            });
            if (response.data == true) {
                Swal.fire({
                    title: 'Informational Alert!',
                    text: `A one time pin has been send to ${email}. \nPlease check your inbox or spam folder for further instruction.`,
                    icon: 'info',
                    confirmButtonText: 'OK',
                });

                router.push(`./updatepass?email=${email}`);
            }
            else {
                setEmailError('Email doesnt exist.');
                formIsValid = false;
                setMessage("");
            }
            return response.data;
        }
        catch (error) {
            console.log("Error", error);
        }
    }



    return (
        <>
            <Title page='Forget Password'></Title>
            <Layout>
                <form onSubmit={handleSubmit}>
                    <div id="form">

                        <h1 align='center'>Forget Password</h1>

                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' id='email' onChange={handleChangeEmail} placeholder="Type your Email" className="input input-bordered w-full max-w-xs" />
                        <br />{emailError && <div className="error">{emailError}</div>}
                        {message && <div className="message whitespace-pre-wrap">{message}</div>}
                        <p align='center'><button type="submit" name="forgetpass" className="btn">Submit</button></p>
                    </div>

                </form>
            </Layout>
        </>
    )
}