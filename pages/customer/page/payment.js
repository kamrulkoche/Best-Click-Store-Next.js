
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
    const [total, setTotal] = useState('');
    const [oid, setOid] = useState('');
    const [method, setMethod] = useState('');
    const [address, setAddress] = useState('');
    const [success, setSuccess] = useState('');

    //error variables
    const [methodError, setMethodError] = useState('');
    const [addressError, setAddressError] = useState('');


    //handle inpute field changes start here
    const handleChangeMethod = (e) => {
        setMethod(e.target.value);
    };
    const handleChangeAddress = (e) => {
        setAddress(e.target.value);
    };



    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        fetchOid();
        getProfile();
    }, []);


    //Get email from url
    async function fetchOid() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const oid = urlParams.get('oid');
            setOid(oid);
            getOrder(oid);
        } catch (error) {
            console.error(error);
        }
    }

    async function getOrder(oid) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `getorder/${oid}`,{
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);

            console.log(jsonData);

            setTotal(jsonData.total);


        } catch (error) {
            console.error(error);
        }
    }

    async function getProfile() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'profile',{
                withCredentials: true
            });
            setAddress(response.data.address);

        } catch (error) {
            console.error(error);
        }
    }

    let formIsValid = true;
    const handleSubmit = async (e) => {

        e.preventDefault();

        
        // gender validation
        if (!method) {
            setMethodError('Payment method is required');
            formIsValid = false;
        }
        else {
            setMethodError('');
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
                addPayment()
                alert("Your order has been placed successfully")
                router.push('./orders');
                

                
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


    async function addPayment() {
        try {
            const data = {
                address: address,
                method: method,
                total: total,
                oid: oid
            };
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'addpayment', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            });
            console.log(response);

            

        }
        catch (error) {
            console.log(error);
            formIsValid = false
        }
    }


    

    return (

        <>
            <Title page="Payment"></Title>
            <Clayout>
                <div className='flex justify-center'>
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <h1 align="center">Edit Profile</h1>
                            <label htmlFor="address">Address:</label><br />
                            <input type="text" placeholder="Address" className="input input-bordered input-secondary w-full max-w-xs my-2" name="address" id="address" defaultValue={address} onChange={handleChangeAddress}></input><br />
                            {addressError && <b className="text-red-500">{addressError}</b>}<br />

                            <label htmlFor="total">Total:</label>
                            <input type="text" placeholder="Total" className="input input-bordered input-secondary w-full max-w-xs my-2" name="total" id="total" defaultValue={total} disabled></input><br />
                            
                            <label>Payment Method:</label><br/>
                            <label>
                                <input type="radio" name="payment" className="radio radio-secondary" value="bkash" onChange={handleChangeMethod} />
                                Bkash
                            </label><br/>
                            <label>
                                <input type="radio" name="payment" className="radio radio-secondary" value="Nagad"  onChange={handleChangeMethod}/>
                                Nagad
                            </label><br/>
                            <label>
                                <input type="radio" name="payment" className="radio radio-secondary" value="Rocket"  onChange={handleChangeMethod}/>
                                Rocket
                            </label><br/>
                            <label>
                                <input type="radio" name="payment" className="radio radio-secondary" value="Card"  onChange={handleChangeMethod}/>
                                Card
                            </label><br/>
                            <label>
                                <input type="radio" name="payment" className="radio radio-secondary" value="Cash on delivery"  onChange={handleChangeMethod}/>
                                Cash on delivery
                            </label>
                            <br />{methodError && <b className="text-red-500">{methodError}</b>}                            
                            {success && <b className="text-green-500">{success}</b>}<br/>


                            <p align="center"><input type="submit" className="btn btn-warning my-4" name="confirm" value="Confirm Order"></input></p>
                        </div>

                    </form>
                </div>



            </Clayout>






        </>

    )
}

