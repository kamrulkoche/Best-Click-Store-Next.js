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
    // const[email,setEmail]=useState('');
    // const[address,setAddress]=useState('');
    // const[phone,setPhone]=useState('');
    // const [password, setPassword] = useState('');
    // const[gender,setGender]= useState('');
    // const[profile,setProfile]= useState('');
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
        let isValidForm = true;
        // Perform form validation
        if(!name){
            setNameError("Name is required");
            isValidForm =false;
        }
        // else if(!isValidName(name)){
        //     setNameError("Name is required");
        //     isValidForm =false;
        // }
        else{
            setNameError('');
        }

        
        if(isValidForm){
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
    
    const validatePhone = phone => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
      };

    



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
                    </td>
                </tr>
                <br></br>
                <tr>
                    <td>
                    <label for="email">Email:</label>
                    &nbsp; <input type="text" placeholder="Email" className="input input-bordered input-secondary w-full max-w-xs"  name="email" id="email" onChange={handleChangeEmail}></input>
                    </td>

                </tr>
                <br></br>
               
               <tr>
                <td>
                    <label for="address">Address:</label>
                    &nbsp;< input type="text" placeholder="Address" className="input input-bordered input-secondary w-full max-w-xs" name="address" id="address" value={address} onChange={handleChangeAddress} ></input>
                </td>
               </tr>
               <br></br>
               <tr>
                    <td>
                    <label for="phone">Phone:</label>
                    &nbsp;<input type="text" placeholder="Phone" className="input input-bordered input-secondary w-full max-w-xs" name="phone" id="phone" value={phone} onChange={handleChangePhone}></input>
                    </td>
               </tr>
               <br></br>
                <tr>
                    <td>
                    <label for="password">Password:</label>
                    &nbsp;<input type="text" placeholder="Password" className="input input-bordered input-secondary w-full max-w-xs" name="password" id="password" value={password} onChange={handleChangePassword}></input>
                    </td>
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
                       

                    </td>
               </tr>
               <br></br>
               <tr>
                    <td>
                    <label for="profile">Profile picture:</label>
                    &nbsp;<input type="file" name="profile" id="profile" onChange={handleChangeProfile}></input>
                    
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

