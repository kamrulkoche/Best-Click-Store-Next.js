
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
const Title = dynamic(() => import('../../best_click_store/layout/title'), {
    ssr: false,
})
const Clayout = dynamic(() => import('../layout/clayout'), {
    ssr: false,
})
export default function Home() {
    //input variables
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [success, setSuccess] = useState('');

    //error variables
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');

    //handle inpute field changes start here

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };



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

            setName(jsonData.name);
            setPhone(jsonData.phone);
            setGender(jsonData.gender);
            setAddress(jsonData.address);

        } catch (error) {
            console.error(error);
        }
    }

    let formIsValid = true;
    const handleSubmit = async (e) => {

        e.preventDefault();

        

        // name validation
        if (!name) {
            setNameError('Name is required');
            formIsValid = false;
        }
        else if (!isValidName(name)) {
            setNameError('Name only contain a-z or A-Z or dot(.) or dash(-) and must start with a letter and atleast 2 charecter ');
            formIsValid = false;
        }
        else {
            setNameError('');
        }


        // phone validation
        if (!phone) {
            setPhoneError('Phone is required');
            formIsValid = false;
        }
        else if (!isValidPhone(phone)) {
            setPhoneError('Please enter a valid 11 digit Phone number');
            formIsValid = false;
        }
        else {
            setPhoneError('');
        }


        // gender validation
        if (!gender) {
            setGenderError('Gender is required');
            formIsValid = false;
        }
        else {
            setGenderError('');
        }

        //address validation
        if (!address) {
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
                name: name,
                phone: phone,
                gender: gender,
                address: address
            };
            const response = await axios.put(process.env.NEXT_PUBLIC_BACKEND_URL + 'updateprofile', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials:true
                
            });

        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
                console.log(error);
                formIsValid = false;
                setSuccess('');
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

    return (

        <>
            <Title page="Edit Profile"></Title>
            <Clayout>
                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <h1 align="center">Edit Profile</h1>
                            <label>Name:</label><br />
                            <input type="text" placeholder="Name" className="input input-bordered input-secondary w-full max-w-xs my-2" name="name" id="name" defaultValue={name} onChange={handleChangeName}></input><br />
                            {nameError && <b className="text-red-500">{nameError}</b>}<br />

                            <label>Address:</label><br />
                            <input type="text" placeholder="Address" className="input input-bordered input-secondary w-full max-w-xs my-2" name="address" id="address" defaultValue={address} onChange={handleChangeAddress}></input><br />
                            {addressError && <b className="text-red-500">{addressError}</b>}<br />

                            <label>Phone number:</label><br />
                            <input type="text" placeholder="Phone" className="input input-bordered input-secondary w-full max-w-xs my-2" name="phone" id="phone" defaultValue={phone} onChange={handleChangePhone}></input><br />
                            {phoneError && <b className="text-red-500">{phoneError}</b>}<br />

                            <label>Gender:</label><br/>
                            <label>
                                <input type="radio" name="radio-3" className="radio radio-secondary" value="male" checked={gender === "male"} onChange={handleChangeGender} />
                                Male
                            </label>
                            <label>
                                <input type="radio" name="radio-3" className="radio radio-secondary" value="female" checked={gender === "female"} onChange={handleChangeGender}/>
                                Female
                            </label>
                            <label>
                                <input type="radio" name="radio-3" className="radio radio-secondary" value="other" checked={gender === "gender"} onChange={handleChangeGender}/>
                                others
                            </label>
                            <br />{genderError && <b className="text-red-500">{genderError}</b>}
                            {success && <b className="text-green-500">{success}</b>}<br/>


                            <p align="center"><input type="submit" className="btn btn-warning my-4" name="Edit" value="Edit"></input></p>
                        </div>

                    </form>
                </div>



            </Clayout>






        </>

    )
}

