import Link from 'next/link';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const Title= dynamic(()=>import('./layout/title'),{
  ssr:false,
})
const Layout= dynamic(()=>import( './layout/layout'),{
  ssr:false,
})
export default function Registration() {
    const[name,setName]= useState('');
    const[email,setEmail]=useState('');
    const[address,setAddress]=useState('');
    const[phone,setPhone]=useState('');
    const [password, setPassword] = useState('');
    const[gender,setGender]= useState('');
    const[profile,setProfile]= useState('');

    const[nameError,setNameError]= useState('');
    const[emailError,setEmailError]=useState('');
    const[addresserror,setAddressError]=useState('');
    const[phoneerror,setPhoneError]=useState('');
    const [passworderror, setPasswordError] = useState('');
    const[gendererror,setGenderError]= useState('');
    const[profileerror,setprofileerror]= useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
 
    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    
    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };
    const handleChangeProfile = (e) => {
        setProfile(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formIsValid = true;
        // Perform form validation
        if(!name){
            setNameError("Name is required");
            formIsValid =false;
        }
        else {
            setNameError('');
        }

        // email validation
        if (!email) {
            setEmailError('Email is required');
            formIsValid = false;
        }
        else if (!isValidEmail(email)) {
            setEmailError('Invalid email address');
            formIsValid = false;
        }
        else {
            setEmailError('');
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


        //password validatio
        if (!password) {
            setPasswordError('Password is required');
            formIsValid = false;
        }
        else if (!isValidPassword(password)) {
            setPasswordError(`Password Must contain: \n1. At least 8 characters \n2. One upper letter [A-Z] \n3. One lower letter [a-z] \n4. One digit [0-9] \n5. One special character [@$!%*?&] `);
            formIsValid = false;
        }
        else {
            setPasswordError('');
        }


        if (!profile) {
            setprofileerror('Profile picture is required');
            formIsValid = false;
        }

        else {
            setprofileerror('');
        }
    
        
        
        if(formIsValid){
            const res = await doRegistration( );
            console.log(res);
        }
    };
    
    async function doRegistration(){
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('gender', gender);
            formData.append('address', address);
            formData.append('password', password);
            formData.append('profile', document.querySelector('#profile').files[0]);
            console.log(formData);
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'registration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = response.data;
            console.log(data);
            setSuccess("Registration successful");
            // const response = await axios.post('http://localhost:3000/customer/registration',{
            //     email,
            //     password
            // });
            // console.log(response.status);
            // console.log(response.data);
            // return response.data;
        }
        catch(error){
            console.error('Registration failed', error);
            console.log(error.response.data.message);
            
        }
    }

    const isValidEmail = (email) => {
        const emailPattern = /^\S+@\S+\.\S+$/;
        return emailPattern.test(email);
    }
    
    const isValidName = (name) => {
        const namePattern = /^[a-zA-Z][a-zA-Z\-\.\s]{1,150}$/;
        return namePattern.test(name);
    }



    const isValidPhone = (phone) => {
        const phonePattern = /^[0][1][3-9][0-9]{8}$/;
        return phonePattern.test(phone);
    }



    const isValidPassword = (password) => {
        const phonePattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return phonePattern.test(password);
    }




    



  return (

    <>
    <Title page="Registration"></Title>
    <Layout>
    <h1 align="center">Registration</h1>
    <div>
    <table align="center">
       <tr>
        <td>
            <form onSubmit={handleSubmit}>
                <tr>
                    <td>
                    <label for="name">Name:</label>
                    &nbsp;<input type="text" placeholder="Name" className="input input-bordered input-secondary w-full max-w-xs"  name="name" id="name" onChange={handleChangeName}></input>
                    <br />{nameError && <div className="error">{nameError}</div>}
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>
                    <label for="email">Email:</label>
                    &nbsp; <input type="text" placeholder="Email" className="input input-bordered input-secondary w-full max-w-xs"  name="email" id="email" onChange={handleChangeEmail}></input>
                    <br />{emailError && <div className="error">{emailError}</div>}
                    </td>

                </tr>
                <br></br>
               
               <tr>
                <td>
                    <label for="address">Address:</label>
                    &nbsp;< input type="text" placeholder="Address" className="input input-bordered input-secondary w-full max-w-xs" name="address" id="address" value={address} onChange={handleChangeAddress} ></input>
                    <br />{addresserror && <div className="error">{addresserror}</div>} </td>
               </tr>
               <br></br>
               <tr>
                    <td>
                    <label for="phone">Phone:</label>
                    &nbsp;<input type="text" placeholder="Phone" className="input input-bordered input-secondary w-full max-w-xs" name="phone" id="phone" value={phone} onChange={handleChangePhone}></input>
                    <br />{phoneerror && <div className="error">{phoneerror}</div>}</td>
               </tr>
               <br></br>
                <tr>
                    <td>
                    <label for="password">Password:</label>
                    &nbsp;<input type="text" placeholder="Password" className="input input-bordered input-secondary w-full max-w-xs" name="password" id="password" value={password} onChange={handleChangePassword}></input>
                    <br />{passworderror && <div className="error">{passworderror}</div>}</td>
                </tr>
                <br></br>
               <tr>
                    <td>
                        <label>Gender:</label>&nbsp; &nbsp;
                        <label>
                        <input type="radio" name="radio-3" className="radio radio-secondary" value="male"
                        checked={gender === "male"}
                        onChange={handleChangeGender}/>
                        Male</label>
                        <label>
                        <input type="radio" name="radio-3" className="radio radio-secondary"value="female"
                        checked={gender === "female"}
                        onChange={handleChangeGender}
                        />
                        Female</label>
                        <label>
                        <input type="radio" name="radio-3" className="radio radio-secondary"
                        value="other"
                        checked={gender === "other"}
                        onChange={handleChangeGender}
                        />
                        others</label>
                        <br />{gendererror && <div className="error">{gendererror}</div>}

                    </td>
               </tr>
               <br></br>
               <tr>
                    <td>
                    <label for="profile">Profile picture:</label>
                    &nbsp;<input type="file" name="profile" id="profile" onChange={handleChangeProfile}></input>
                    <br />{profileerror && <div className="error">{profileerror}</div>}
                    </td>

                    
                </tr>
               
               <br></br>
               <tr align="center">
                <td  align="center">
                    <input type="submit" className="btn btn-warning" name="registration" value="Register"></input>
                </td>
               </tr>

               <tr>
                <td>
                
                    {success && <p>{success}</p>}
                    
                </td>
               </tr>
              
                
               

            </form>
            {error && <p>{error}</p>}
        </td>
       </tr>

    </table>

    </div>
   
   
    
   </Layout>




   
   
   </>
   
  )
}

