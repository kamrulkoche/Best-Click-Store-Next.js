import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';

const Layout = dynamic(() => import('../best_click_store/layout/layout'), {
    ssr: false,
})

const Title = dynamic(() => import('../best_click_store/layout/title'), {
    ssr: false,
})

export default function Registration() {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //input variables
    const [mechanic_name, setName] = useState('');
    const [mechanic_email, setEmail] = useState('');
    const [mechanic_phone, setPhone] = useState('');
    const [mechanic_nid, setNid] = useState('');
    const [mechanic_gender, setGender] = useState('');
    const [mechanic_address, setAddress] = useState('');
    const [mechanic_password, setPassword] = useState('');
    const [mechanic_cpassword, setCPassword] = useState('');
    const [profile, setprofile] = useState('');
    const [success, setSuccess] = useState('');


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //error variables
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [nidError, setNidError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [cpassError, setCpassError] = useState('');
    const [profileError, setProfileError] = useState('');




    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //handle inpute field changes start here

    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
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
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangeCPassword = (e) => {
        setCPassword(e.target.value);
    };
    const handleChangeProfile = (e) => {
        setprofile(e.target.files[0]);
    };

    //handle input field changes end here

    ///////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    //Handle Submit part start here

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

        // email validation
        if (!mechanic_email) {
            setEmailError('Email is required');
            formIsValid = false;
        }
        else if (!isValidEmail(mechanic_email)) {
            setEmailError('Invalid email address');
            formIsValid = false;
        }
        else {
            setEmailError('');
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


        //password validatio
        if (!mechanic_password) {
            setPasswordError('Password is required');
            formIsValid = false;
        }
        else if (!isValidPassword(mechanic_password)) {
            setPasswordError(`Password Must contain: \n1. At least 8 characters \n2. One upper letter [A-Z] \n3. One lower letter [a-z] \n4. One digit [0-9] \n5. One special character [@$!%*?&] `);
            formIsValid = false;
        }
        else {
            setPasswordError('');
        }

        if (!mechanic_cpassword) {
            setCpassError('Confirm password is required');
            formIsValid = false;
        }
        else if (mechanic_password != mechanic_cpassword) {
            setCpassError('Password doesn\'t match');
            formIsValid = false;
        }
        else {
            setCpassError('');
        }


        if (!profile) {
            setProfileError('Profile picture is required');
            formIsValid = false;
        }
        else if (!isValidFile(profile.name)) {
            setProfileError('Only take jpg/png/webp/jpeg files');
            formIsValid = false;
        }
        else {
            setProfileError('');
        }


        if (formIsValid) {
            try {
                const res = await registration();

                setSuccess('Registration successfull')
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


    async function registration() {
        try {
            const formData = new FormData();
            formData.append('mechanic_name', mechanic_name);
            formData.append('mechanic_email', mechanic_email);
            formData.append('mechanic_phone', mechanic_phone);
            formData.append('mechanic_nid', mechanic_nid);
            formData.append('mechanic_gender', mechanic_gender);
            formData.append('mechanic_address', mechanic_address);
            formData.append('mechanic_password', mechanic_password);
            formData.append('profile', document.querySelector('#profile').files[0]);

            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            console.log(data);
            if(response.status == 200){
                alert('Registration Susscessful')
            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.data.message === "Phone already exist") {
                    setPhoneError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                }
                else if (error.response.data.message === "NID already exist") {
                    setNidError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                }
                else if (error.response.data.message === "Email already exist") {
                    setEmailError(error.response.data.message);
                    setSuccess('');
                    formIsValid = false;
                }
                else if (error.response.status == 413) {
                    setProfileError('File is too Large to upload');
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
        const namePattern = /^[a-zA-Z][a-zA-Z\-\.\s]{1,150}$/;
        return namePattern.test(name);
    }


    const isValidEmail = (email) => {
        const emailPattern = /^\S+@\S+\.\S+$/;
        return emailPattern.test(email);
    }


    const isValidPhone = (phone) => {
        const phonePattern = /^[0][1][3-9][0-9]{8}$/;
        return phonePattern.test(phone);
    }


    const isValidNid = (nid) => {
        const phonePattern = /^[1-9][0-9]{9}$/;
        return phonePattern.test(nid);
    }


    const isValidPassword = (password) => {
        const phonePattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return phonePattern.test(password);
    }


    const isValidFile = (profile) => {
        const fileFormat = /^.*\.(jpg|webp|png|jpeg|JPG|WEBP|PNG|JPEG)$/;
        const test = fileFormat.test(profile);
        return test;
    }



    //Handle Submit part end here

    ///////////////////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <Title page='Mechanic Registration'></Title>
            <Layout>
                    <form onSubmit={handleSubmit}>
                        <div id="form">
                            <h1 align='center'>Registration</h1>
                            <label htmlFor='name'>Name</label>
                            <input type="text" name='mechanic_name' id='name' onChange={handleChangeName} placeholder="Type here" className="input" />
                            <br />{nameError && <div className="error">{nameError}</div>}

                            <label htmlFor='email'>Email</label>
                            <input type='text' name='mechanic_email' id='email' onChange={handleChangeEmail} placeholder="Type here" className="input" />
                            <br />{emailError && <div className="error">{emailError}</div>}

                            <label htmlFor='nid'>NID</label>
                            <input type='text' name='mechanic_nid' id='nid' onChange={handleChangeNid} placeholder="Type here" className="input" />
                            <br />{nidError && <div className="error"> {nidError}</div>}

                            <label htmlFor='phone' maxLength='11'>Phone</label>
                            <input type='text' name='mechanic_phone' id='phone' onChange={handleChangePhone} placeholder="Type here" className="input" />
                            <br />{phoneError && <div className="error">{phoneError}</div>}

                            <label className="pb-2">Gender</label>
                            <input type="radio" name='mechanic_gender' id="male" value='Male' checked={mechanic_gender === "Male"} onChange={handleChangeGender} className="radio radio-primary" />
                            <label htmlFor="male" id="gen"> Male </label>
                            <input type="radio" name='mechanic_gender' id="female" value='Female' checked={mechanic_gender === "Female"} onChange={handleChangeGender} className="radio radio-primary" />
                            <label htmlFor="female" id="gen"> Female </label>
                            <input type="radio" name='mechanic_gender' id="others" value='Others' checked={mechanic_gender === "Others"} onChange={handleChangeGender} className="radio radio-primary" />
                            <label htmlFor="others" id="gen"> Others </label>
                            <br />{genderError && <div className="error">{genderError}</div>}

                            <label htmlFor='address'>Address</label>
                            <input type='text' name='mechanic_address' id='address' onChange={handleChangeAddress} placeholder="Type here" className="input" />
                            <br />{addressError && <div className="error">{addressError}</div>}

                            <label htmlFor='password'>Password</label>
                            <input type='text' name='mechanic_password' id='password' onChange={handleChangePassword} placeholder="Type here" className="input" />
                            <br />{passwordError && <div className="error whitespace-pre-wrap">{passwordError}</div>}

                            <label htmlFor='cpassword'>Confirm Password</label>
                            <input type='text' name='mechanic_cpassword' id='cpassword' onChange={handleChangeCPassword} placeholder="Type here" className="input" />
                            <br />{cpassError && <div className="error">{cpassError}</div>}

                            <label htmlFor='profile'>Select Profile Picture</label>
                            <input type='file' name='profile' id='profile' onChange={handleChangeProfile} accept="image/*" className="file-input file-input-bordered file-input-primary max-w-xs" />
                            <br />{profileError && <div className="error">{profileError}</div>}
                            {success && <div className="success">{success}</div>}
                            <p align="center"><button type="submit" name="mechanic_registration" className="btn">Submit</button></p>
                            <p align='center'>Already have an account?</p>
                            <p align='center'><Link href='./login'>Login</Link></p>
                        </div>
                    </form>
            </Layout>
        </>
    )
}