import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';




const Title = dynamic(() => import('../Layout/title'), { ssr: false, })
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false, })


export default function ChangeProfile() {



    const image =process.env.NEXT_PUBLIC_BACKEND_URL;
    const [ID, setId] = useState('');
   
    const [email, setEmail] = useState('');
    
    const [filename, setfilename] = useState('');

    const [jsonData, setJsonData] = useState(null);




    useEffect(() => {

        getProfile();
     
    }, []);

    async function getProfile() {
        try {
            const response = await axios.get('http://localhost:3000/admin/profile', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error(error);
        }
    }






   
    const [profile, setProfile] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

  
    const [profileError, setProfileError] = useState('');
    const [error, setError] = useState('');



    const handleChangeProfile = (e) => {
        setProfile(e.target.files[0]);
        
    };

    
    

    const [previewImage, setPreviewImage] = useState('');

  
    useEffect(() => {
        if (profile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviewImage(e.target.result);
          };
          reader.readAsDataURL(profile);
        } else {
          setPreviewImage('');
        }
      }, [profile]);


    //Get email from url
    


    


    const handleSubmit = async (e) => {

        e.preventDefault();

        let formIsValid = true;

        // name validation
        if (!profile) {
            setProfileError('Name is required');
            formIsValid = false;
        }
        else {
            setProfileError('');
        }

        if (formIsValid) {
            try {
                
                console.log(profile);
                const res = await changeprofilepic();
                
                 
                    router.push('user_profile');
            }
            catch (error) {

                console.log(error);

            }
        }
        else {
            setSuccess("");
        }
    };



    async function changeprofilepic() {
        try {
            const formData = new FormData();
            formData.append('filename', document.querySelector('#filename').files[0]);
            const response = await axios.put(`http://localhost:3000/admin/changeprofile`,  formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials:true,
            });
            // const data = response;
            sessionStorage.setItem("filename", response.data);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }


    return (

        <>
            <Title page='Change Profile'></Title>

            <Layout>









                
                <h1 align='center' className="text-4xl pt-4">Change Profile Picture</h1>
                <div className="detaills w-full float-left justify-center align-items-center flex flex-row  mt-10" >
                 
                    <form onSubmit={handleSubmit}>

                        <label htmlFor='profile' className="text-xl pt-4">Select Profile Picture</label><br /><br />
                        <input type="file" name="filename" id="filename" className="file-input file-input-bordered file-input-accent w-full max-w-xs" onChange={handleChangeProfile} />
                        <br />{success && <b className="text-green-500">{success}</b>}<br />

                        <p align="center"><button type="submit" className="btn bg-cyan-400 hover:bg-cyan-300 mt-10">Change</button></p>
                    </form>
                </div>
               

           
                </Layout>

+
        </>
    );
}