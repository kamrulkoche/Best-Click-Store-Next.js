import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

const Title = dynamic(() => import('../Layout/title'), { ssr: false });
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false });

export default function Change_password() {
    

    const router = useRouter();
    const [id, setId] = useState('');
    const [JsonData,setJsonData]=useState('');
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [conpassword, setConpassword] = useState('');
    const [error, setError] = useState('');


    const handleoldpassword = (e) => {

        setOldpassword(e.target.value);

    };
    const handlepassword = (e) => {

        setNewpassword(e.target.value);

    };
    const handleconfirm_password = (e) => {

        setConpassword (e.target.value);

    };

    useEffect(() => {
        getProfile();

    },[])


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




    const handleSubmit=async(e)=>{
        e.preventDefault();
        
    
     
        let isValid = true;
        if (newpassword !== conpassword) {
            isValid = false;
            setError("Incorrect ")
        }
        if (isValid) {
            try {
                const data = {

                    password: oldpassword,
    
                    new_password: newpassword,
    
                    confirm_password: conpassword,
    
                };
                const response = await axios.patch('http://localhost:3000/admin/changepass', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials:true,
                });

                console.log("DONE!");
                router.push('dashboard');
            } catch (error) {
                console.error(error);
                // setLoading(false);
            }
        }
        else
            console.log("Incorrect");
    };
    
    
       
    



    return (
        <>
            <Title page="Edit Profile" />
            <Layout>
                
                <fieldset align="center">




                    <h1>Change Password</h1>
                    <form onSubmit={handleSubmit}>
                     

                        <div>
                            <label >Old Password</label>
                            <input
                                type="text"
                                id="oldpassword"   
                                onChange={handleoldpassword}
                                defaultValue={''}
                            
                            />
                          </div>
                        <div>
                            <label >New Password</label>
                            <input
                                type="text"
                                id="password"
                                onChange={handlepassword}
                                defaultValue={''}
                               
                            />
                        
                        </div>
                        <div>
                            <label >Comfirm Password </label>
                            <input
                                type="text"
                                id="confirm_password"
                                onChange={handleconfirm_password}
                                defaultValue={''}
                             
                            />
                        
                        </div>


                        <div>
                        {error && <p>{error}</p>}
                            <button type="submit" class="">Submit</button>
                        </div>

                    </form>
                </fieldset>

            </Layout >
        </>
    );
    }
