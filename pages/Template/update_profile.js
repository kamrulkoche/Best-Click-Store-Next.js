import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Title = dynamic(() => import('../Layout/title'), { ssr: false });
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false });

export default function Update_profile() {
   
   
    const router = useRouter();

    const [jsonData, setJsonData] = useState(null);

    const [id, setId] = useState('');
    const [firstName, setFname] = useState('');
    const [lastName, setLname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');




    const [idError, setIdError] = useState('');
    const [fnameError, setfnameError] = useState('');

    const handleChangeId = (e) => {

        setId(e.target.value);

    };

    const handleChangefname = (e) => {

        setFname(e.target.value);

    };

    const handleChangelname = (e) => {

        setLname(e.target.value);

    };

    const handleChangegender = (e) => {

        setGender(e.target.value);

    };

    const handleChangeemail = (e) => {

        setEmail(e.target.value);

    };
    const handleChangephone = (e) => {

        setPhone(e.target.value);

    };



    useEffect(() => {
        getProfile();

    }, [])

    async function getProfile() {
        try {
            const response = await axios.get('http://localhost:3000/admin/profile', {
                withCredentials: true
            });

            const jsonData = response.data;
            setId(jsonData.id);
            setFname(jsonData.fname);
            setLname(jsonData.lname);
            setGender(jsonData.gender);
            setEmail(jsonData.email);
            setPhone(jsonData.phone);
            console.log(jsonData);
            setJsonData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error(error);
        }
    }



const handleSubmit=async(e)=>{
    e.preventDefault();
    let formIsValid = true;

 

    // name validation
    if (!id) {
        setIdError('Id is required');
        formIsValid = false;
    }
    else {
        setIdError('');
    }
    // name validation
    if (!firstName) {
        setfnameError('Fname is required');
        formIsValid = false;
    }
    else {
        setIdError('');
    }





    if (formIsValid) {
        try {
            const res = await editProfile();
        }
        catch (error) {
            console.log(error);
            formIsValid = false;
        }



    }


}
    async function editProfile(){
        // setLoading(true);
        try {
            const data = {

                id: id,

                fname: firstName,

                lname: lastName,

                gender: gender,

                email: email,

                phone: phone,


              

            };
            console.log(data);
            const response = await axios.put('http://localhost:3000/admin/updateadmin', data, {
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                withCredentials:true,
            });



            router.push('dashboard'); 
        } catch (error) {
            console.error(error);
        }
    };

      //console.log(`${image}getimage/${filename}`);
      const handleLogout = () => {
        logout();
        // router.push('sign_in');
    };

    return (
        <>
            <Title page="Edit Profile" />
            <Layout>















                
                {jsonData !== null && (




<div>





                    <fieldset align="center">
                        <div align="right">

                            <a href='delete_profile'><h3>Delete Profile</h3></a>

                        </div>

                        <h1>Edit Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    id="id"
                                    value={jsonData.id}
                                    onChange={handleChangeId}
                                    hidden
                                    // {...register('id', { required: 'ID is required' })}
                                />
                                {/* {errors.id && <p>{errors.id.message}</p>} */}
                            </div>



                            <div className="form-control">
                                <label className="input-group">
                                    <span>First Name</span>
                                    <input
                                        type="text"
                                        id="fname"
                                        defaultValue={jsonData.fname}
                                        onChange={handleChangefname}
                                        className="input input-bordered"
                                        // {...register('fname', { required: 'First name is required' })}
                                    />
                                    {fnameError && <p>{fnameError}</p>}
                                </label>
                            </div>

                            <br></br>
                            <div className="form-control">
                                <label className="input-group">
                                    <span>Last Name</span>
                                    <input
                                        type="text"
                                        id="lname"
                                        defaultValue={jsonData.lname}
                                        onChange={handleChangelname}
                                        className="input input-bordered"
                                        // {...register('lname', { required: 'Last name is required' })}
                                    />
                                    {/* {errors.lname && <p>{errors.lname.message}</p>} */}
                                </label>
                            </div>

                            <br></br>

                            <div className="form-control">
                                <label className="input-group">
                                    <span>Gender</span>
                                    <input
                                        type="text"
                                        id="gender"
                                        defaultValue={jsonData.gender}
                                        onChange={handleChangegender}
                                        className="input input-bordered"
                                        // {...register('gender', { required: 'Gender is required' })}
                                    />
                                    {/* {errors.gender && <p>{errors.gender.message}</p>} */}
                                </label>
                            </div>

                            <br></br>

                            <div className="form-control">
                                <label className="input-group">
                                    <span>Email</span>
                                    <input
                                        type="text"
                                        id="email"
                                        defaultValue={jsonData.email}
                                        onChange={handleChangeemail}
                                        className="input input-bordered"
                                        // {...register('email', { required: 'Email is required' })}
                                    />
                                    {/* {errors.email && <p>{errors.email.message}</p>} */}
                                </label>
                            </div>

                            <br></br>

                            <div className="form-control">
                                <label className="input-group">
                                    <span>Phone</span>
                                    <input
                                        type="text"
                                        id="phone"
                                        defaultValue={jsonData.phone}
                                        onChange={handleChangephone}
                                        className="input input-bordered"
                                        // {...register('phone', { required: 'Phone is required' })}
                                    />
                                    {/* {errors.phone && <p>{errors.phone.message}</p>} */}
                                </label>
                            </div>

                            <br></br>

                            <div className="form-control">
                                <label className="input-group">
                                    <h3 align="center"><button type="submit" class="">Submit</button></h3>
                                </label>
                            </div>
                            <div>
                        </div>

                        </form>
                    </fieldset>



</div>



  
 


                )}

            </Layout >
        </>
    );
}
