import Link from 'next/link';
import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import React from 'react';
const Title= dynamic(()=>import('../../best_click_store/layout/title'),{
  ssr:false,
})
const Clayout= dynamic(()=>import( '../layout/clayout'),{
    ssr:false,
  })
export default function cpicture() {
   
    const[profile,setProfile]= useState('');

    const [jsonData, setJsonData] = useState(null);

    const [previewImage, setPreviewImage] = useState('');
    const router = useRouter();

    useEffect(() => {
        getProfile();
    }, []);
    

    useEffect(() => {
        if (profile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
        } else {
            setPreviewImage('');
        }
    }, [profile]);

    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile' ,{
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }


    

    
   
    const handleChangeProfile = (e) => {
        setProfile(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValidForm = true;
        // Perform form validation
        if(!profile){
            setProfile("Profile picture is required");
            isValidForm =false;
        }
        else{
            setProfile('');
        }

        
        if(isValidForm){
            const res = await cpicture( );
            console.log(res);
        }
    };
    
    async function cpicture(){
        try{
            const formData = new FormData();
            formData.append('profile', document.querySelector('#profile').files[0]);
            console.log(formData);
            const response = await axios.put(process.env.NEXT_PUBLIC_BACKEND_URL+'changeprofile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials:true
            });
            const data = response.data;
            console.log(data);
            router.push('../page/dashboard');
            alert('Update Successful')
            
        }
        catch(error){
            console.error('failed', error);
            console.log(error.response.data.message);
            
        }
    }

   return (

    <>
    <Title page="Change Profile Picture"></Title>
    <Clayout>
    <h1 align="center">Change Profile Picture</h1>
    {jsonData !== null && (
    <div>
    <table align="center">
       <tr>
        <td>
            <form onSubmit={handleSubmit}>
                <tr>
                    <td>
                    <img id="previewImage" src={previewImage || process.env.NEXT_PUBLIC_BACKEND_URL + 'profilepicture/' + jsonData.profile} alt="Preview" height={200} width={200}></img>
                    <label for="profile">Profile picture:</label>
                    &nbsp;<input type="file" name="profile" id="profile" onChange={handleChangeProfile}></input>
                    
                    </td>

                    
                </tr>
               
               <br></br>
               <tr align="center">
                <td  align="center">
                    <input type="submit" className="btn btn-warning" name="submit" value="Change"></input>
                </td>
               </tr>
                
               

            </form>
        </td>
       </tr>

    </table>

    </div>
   
    )}
    
   </Clayout>




   
   
   </>
   
  )
}

