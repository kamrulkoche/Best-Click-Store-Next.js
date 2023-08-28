import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../authentication/sessionAuthentication';

const MechanicLayout = dynamic(() => import('../layouts/mechaniclayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function ChangePassword() {
    //input variables
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirm_password, setCPassword] = useState('');
    const [success, setSuccess] = useState('');


    //error variables
    const [oldPassError, setOldPassError] = useState('');
    const [newPassError, setNewPassError] = useState('');
    const [cPassError, setCPassError] = useState('');


    //handle inpute field changes start here
    const handleOldChange = (e) => {
        setOldPassword(e.target.value);
    };
    const handleNewChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleConfirmChange = (e) => {
        setCPassword(e.target.value);
    };



    const [email, setEmail] = useState('');
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        getProfile();
    }, []);


    //get profile
    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile',{
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);

            console.log(jsonData);

        } catch (error) {
            console.error(error);
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        let formIsValid = true;

        if (!old_password) {
            setOldPassError('Old Password is required');
            formIsValid = false;
        }
        else {
            setOldPassError('');
        }



        //password validatio
        if (!new_password) {
            setNewPassError('New Password is required');
            formIsValid = false;
        }
        else if (!isValidPassword(new_password)) {
            setNewPassError(`Password Must contain: \n1. At least 8 characters \n2. One upper letter [A-Z] \n3. One lower letter [a-z] \n4. One digit [0-9] \n5. One special character [@$!%*?&] `);
            formIsValid = false;
        }
        else if (old_password == new_password) {
            setNewPassError('Old password and new password cant be same');
            formIsValid = false;
        }
        else {
            setNewPassError('');
        }


        if (!confirm_password) {
            setCPassError('Confirm password is required');
            formIsValid = false;
        }
        else if (new_password != confirm_password) {
            setCPassError('Password doesn\'t match');
            formIsValid = false;
        }
        else {
            setCPassError('');
        }



        if (formIsValid) {
            try {
                const res = await changePass();
                setSuccess('Update successfull');
            }
            catch (error) {
                if (error.response) {
                    if (error.response.data.message === 406) {
                        setOldPassError('Old password doesnt match');
                        setSuccess('');
                    } else {
                        console.log(error);
                    }
                }
            }
        }
        else {
            setSuccess('');
        }

    };


    async function changePass() {
        try {
            const data = {
                old_password: old_password,
                new_password: new_password,
                confirm_password: confirm_password,
            };
            const response = await axios.patch(process.env.NEXT_PUBLIC_BACKEND_URL + 'changepass', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            const updatedData = response.data;
            console.log(updatedData);
        }
        catch (error) {
            if (error.response) {
                if (error.response.data.message === "Old Password doesnt match") {
                    setOldPassError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                } else {
                    console.log(error);
                }
            }
        }
    }


    const isValidPassword = (password) => {
        const phonePattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return phonePattern.test(password);
    }




    return (
        <>
            <Title page='Change Password'></Title>
            <MechanicLayout>

                <h1 align='center' className="text-4xl pt-4">Change Password</h1>
                <div className="detaills w-full float-left justify-center align-items-center flex flex-row  mt-10">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='oldpass'>Old Password</label><br />
                        <input type='text' name='oldpass' id='oldpass' onChange={handleOldChange} className="input input-bordered w-full max-w-xs"></input>
                        <br />{oldPassError && <b className="text-red-600">{oldPassError}</b>}<br />
                        <label htmlFor='newpass'>New Password</label><br />
                        <input type='text' name='newpass' id='newpass' onChange={handleNewChange} className="input input-bordered w-full max-w-xs"></input>
                        <br />{newPassError && <b className="text-red-600 whitespace-pre-wrap">{newPassError}</b>}<br />
                        <label htmlFor='cpass'>Confirm Password</label><br />
                        <input type='text' name='cpass' id='cpass' onChange={handleConfirmChange} className="input input-bordered w-full max-w-xs"></input>
                        <br />{cPassError && <b className="text-red-600">{cPassError}</b>}{success && <b className="text-green-500">{success}</b>}<br />

                        <p align="center"><button type="submit" className="btn bg-cyan-400 hover:bg-cyan-300">Update</button></p>
                    </form>
                </div>
            </MechanicLayout>
        </>
    )
}