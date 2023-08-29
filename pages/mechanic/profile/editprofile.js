import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const MechanicLayout = dynamic(() => import('../layouts/mechaniclayout'), {
    ssr: false,
})

const Title = dynamic(() => import('../layouts/title'), {
    ssr: false,
})

export default function EditProfile() {
    //input variables
    const [mechanic_name, setName] = useState('');
    const [mechanic_phone, setPhone] = useState('');
    const [mechanic_nid, setNid] = useState('');
    const [mechanic_gender, setGender] = useState('');
    const [mechanic_address, setAddress] = useState('');
    const [success, setSuccess] = useState('');

    //error variables
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nidError, setNidError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');

    //handle inpute field changes start here

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleChangeNid = (e) => {
        setNid(e.target.value);
    };
    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };



    const [email, setEmail] = useState('');
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        getProfile();
    }, []);





    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile',{
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);

            console.log(jsonData);

            setName(jsonData.mechanic_name);
            setNid(jsonData.mechanic_nid);
            setPhone(jsonData.mechanic_phone);
            setGender(jsonData.mechanic_gender);
            setAddress(jsonData.mechanic_address);

        } catch (error) {
            console.error(error);
        }
    }


    const handleSubmit = async (e) => {

        e.preventDefault();

        let formIsValid = true;

        // name validation
        if (!mechanic_name) {
            setNameError('Name is required');
            formIsValid = false;
        }
        else if (!isValidName(mechanic_name)) {
            setNameError('Name only contain a-z or A-Z or dot(.) or dash(-) and must start with a letter and atleast 2 charecter ');
            formIsValid = false;
        }
        else {
            setNameError('');
        }


        // phone validation
        if (!mechanic_phone) {
            setPhoneError('Phone is required');
            formIsValid = false;
        }
        else if (!isValidPhone(mechanic_phone)) {
            setPhoneError('Please enter a valid 11 digit Phone number');
            formIsValid = false;
        }
        else {
            setPhoneError('');
        }



        // nid validation
        if (!mechanic_nid) {
            setNidError('NID is required');
            formIsValid = false;
        }
        else if (!isValidNid(mechanic_nid)) {
            setNidError('Please enter a valid nid');
            formIsValid = false;
        }
        else {
            setNidError('');
        }


        // gender validation
        if (!mechanic_gender) {
            setGenderError('Gender is required');
            formIsValid = false;
        }
        else {
            setGenderError('');
        }

        //address validation
        if (!mechanic_address) {
            setAddressError('Address is required');
            formIsValid = false;
        }
        else {
            setAddressError('');
        }


        if (formIsValid) {
            try {
                const res = await editProfile();

                setSuccess('Update successfull');
            }
            catch (error) {
                console.log(error);
                setSuccess("");
                formIsValid = false;
            }

        }
        else {
            setSuccess("");
        }
    };


    async function editProfile() {
        try {
            const data = {
                mechanic_name: mechanic_name,
                mechanic_phone: mechanic_phone,
                mechanic_nid: mechanic_nid,
                mechanic_gender: mechanic_gender,
                mechanic_address: mechanic_address
            };
            const response = await axios.put(process.env.NEXT_PUBLIC_BACKEND_URL + 'updateprofile', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials:true
                
            });
            const updatedData = response.data;

        }
        catch (error) {
            if (error.response) {
                if (error.response.data.message === "Phone already exist") {
                    setPhoneError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                }
                else if(error.response.data.message === "NID already exist"){
                    setNidError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                } 
                else {
                    console.log(error.response.data.message);
                    console.log(error);
                    setSuccess('');

                }
            }
            console.log(error);
        }
    }


    const isValidName = (name) => {
        const namePattern = /^[a-zA-Z][a-zA-Z\-\.\s]{2,150}$/;
        return namePattern.test(name);
    }



    const isValidPhone = (phone) => {
        const phonePattern = /^[0][1][3-9][0-9]{8}$/;
        return phonePattern.test(phone);
    }


    const isValidNid = (nid) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(nid);
    }


    return (
        <>
            <Title page='Edit Profile'></Title>
            <MechanicLayout>
                {jsonData !== null && (
                    <div >
                        
                        <div className="detaills w-full float-left justify-center align-items-center flex flex-row  mt-10">
                            <form onSubmit={handleSubmit}>
                                <h1 align='center' className="text-4xl pb-8">Edit Profile</h1>
                                <label htmlFor='name'>Name</label><br />
                                <input type='text' name='mechanic_name' id='name' defaultValue={mechanic_name} onChange={handleChangeName} className="input input-bordered w-full max-w-xs" />

                                <br />{nameError && <b className="text-red-500">{nameError}</b>}<br />
                                <label htmlFor='nid'>NID</label><br />
                                <input type='text' name='mechanic_nid' id='nid' defaultValue={mechanic_nid} onChange={handleChangeNid} className="input input-bordered w-full max-w-xs" ></input>
                                <br />{nidError && <b className="text-red-500">{nidError}</b>}<br />
                                <label htmlFor='phone'>Phone</label><br />
                                <input type='text' name='mechanic_phone' id='phone' defaultValue={mechanic_phone} onChange={handleChangePhone} className="input input-bordered w-full max-w-xs" ></input>
                                <br />{phoneError && <b className="text-red-500">{phoneError}</b>}<br />
                                <label> Gender</label><br />
                                <label htmlFor="male" className="text-xl">
                                    <input type="radio" name='mechanic_gender' value='Male' id="male" checked={mechanic_gender === "Male"} onChange={handleChangeGender} className="radio radio-info" ></input> Male
                                </label>
                                <label htmlFor="female">
                                    <input type="radio" name='mechanic_gender' value='Female' id="female" checked={mechanic_gender === "Female"} onChange={handleChangeGender} className="radio radio-info" ></input> Female
                                </label>
                                <label htmlFor="others">
                                    <input type="radio" name='mechanic_gender' value='Others' id="others" checked={mechanic_gender === "Others"} onChange={handleChangeGender} className="radio radio-info" ></input> Others
                                </label><br />{genderError && <b className="text-red-500">{genderError}</b>}<br />
                                <label htmlFor='address'>Address</label><br />
                                <input type='text' name='mechanic_address' id='address' defaultValue={mechanic_address} onChange={handleChangeAddress} className="input input-bordered w-full max-w-xs" ></input>
                                <br />{addressError && <b className="text-red-500">{addressError}</b>}{success && <b className="text-green-500">{success}</b>}<br />
                                <p align="center"><button type="submit" className="btn bg-cyan-400 hover:bg-cyan-300">Update</button></p>
                            </form>
                        </div>
                    </div>
                )}

            </MechanicLayout>
        </>
    )
}