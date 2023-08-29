import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Layout = dynamic(() => import('../best_click_store/layout/layout'), {
    ssr: false,
})

const Title = dynamic(() => import('../best_click_store/layout/title'), {
    ssr: false,
})

export default function UpdatePassword() {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [newpass, setNewpass] = useState('');
    const [cpass, setCpass] = useState('');

    const [pinError, setPinError] = useState('');
    const [newPassError, setNewpassError] = useState('');
    const [cpassError, setCpassError] = useState('');
    const router = useRouter();

    const handleChangePin = (e) => {
        setPin(e.target.value);
    };
    const handleChangeNewpass = (e) => {
        setNewpass(e.target.value);
    };
    const handleChangeCpass = (e) => {
        setCpass(e.target.value);
    };


    useEffect(() => {
        fetchEmail();
    }, []);


    //Get pin from url
    async function fetchEmail() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const emails = urlParams.get('email');
            setEmail(emails);
        } catch (error) {
            console.error(error);
        }
    }

    let formIsValid = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform form validation
        if (!pin) {
            setPinError('Pin is required');
            formIsValid = false;
        }
        else {
            setPinError("");
        }

        if (!newpass) {
            setNewpassError('New Password is required');
            formIsValid = false;
        }
        else if(!isValidPassword(newpass)){
            setNewpassError(`Password Must contain: \n1. At least 8 characters \n2. One upper letter [A-Z] \n3. One lower letter [a-z] \n4. One digit [0-9] \n5. One special character [@$!%*?&] `);
            formIsValid = false;
        }
        else {
            setNewpassError("");
        }

        if (!cpass) {
            setCpassError('confirm password is required');
            formIsValid = false;
        }
        else if (cpass != newpass) {
            setCpassError('Password doesnt match');
            formIsValid = false;
        }
        else {
            setCpassError("");
        }



        if (formIsValid) {
            const change = await changePass();
            console.log(change);
            if(change.status == 200){
                router.push(`./login`);
                alert("Password updated successfully. Try to login")
            }
            
        }
    }


    async function changePass() {
        try {
            const data = {
                pin: pin,
                new_password: newpass,
                confirm_password: cpass,
            };
            console.log(email);
            const response = await axios.put(process.env.NEXT_PUBLIC_BACKEND_URL + `updatepassword/${email}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            const updatedData = response.data;
            console.log(updatedData);
            return response;
        }
        catch (error) {
            if (error.response) {
                if (error.response.data.message === "Wrong Pin") {
                    setPinError(error.response.data.message);
                    formIsValid = false;
                }
                else {
                    console.log(error);
                }
            }console.log(error);
        }
    }


    const isValidPassword = (password) => {
        const phonePattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return phonePattern.test(password);
    }




    return (
        <>
            <Title page='Update Password'></Title>
            <Layout>
                <form onSubmit={handleSubmit}>
                    <div id="form">
                        <h1 align='center'>Update Password</h1>

                        <label htmlFor='pin'>Pin</label>
                        <input type='text' name='pin' id='pin' placeholder="Type your pin" onChange={handleChangePin}  className="input"/>
                        <br />{pinError && <div className="error">{pinError}</div>}

                        <label htmlFor='newpass'>New Password</label>
                        <input type='text' name='newpass' id='newpass' placeholder="Type your newpass" onChange={handleChangeNewpass}  className="input"/>
                        <br />{newPassError && <div className="error whitespace-pre-wrap">{newPassError}</div>}

                        <label htmlFor='cpass'>Confirm Password</label>
                        <input type='text' name='cpass' id='cpass' placeholder="Type your cpass" onChange={handleChangeCpass} className="input" />
                        <br />{cpassError && <div className="error">{cpassError}</div>}

                        <p align='center'><button type="submit" name="updatepass" className="btn">Update</button></p>
                    </div>
                </form>
            </Layout>
        </>
    )
}