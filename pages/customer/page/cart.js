import dynamic from "next/dynamic";
import Productlayout from '../layout/productlayout';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Link from "next/link";
const Title = dynamic(() => import('../../best_click_store/layout/title'), {
    ssr: false,
})
const Clayout = dynamic(() => import('../layout/clayout'), {
    ssr: false,
})
export default function Home() {
    const [jsonData, setJsonData] = useState(null);
    const [checkbox, setCheckbox] = useState(null);
    const [error, setError] = useState(null);
    const handleCheckBox = (event) => {
        const checkboxValue = parseInt(event.target.value);
        if (checkbox.includes(checkboxValue)) {
            setCheckbox(checkbox.filter(value => value !== checkboxValue));
        } else {
            setCheckbox([...checkbox, checkboxValue]);
        }
    };

    useEffect(() => {
        getCartByAdmin();
    }, []);




    async function getCartByAdmin() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'cart', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);


        } catch (error) {
            console.error(error);
        }
    }

    const handleCart = async (cid) => {
        deleteCart(cid);
        const updatedJsonData = jsonData.filter(cart => cart.cartid !== cid);
        setJsonData(updatedJsonData);
    
      }


    async function deleteCart(id) {
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + `cart/${id}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getCartById(id) {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `cartbyid/${id}`, {
                withCredentials: true
            });

            return response.data;
            

        } catch (error) {
            console.error(error);
        }
    }


    async function PlaceOrder(data) {
        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + `addorder`,data, {
                withCredentials: true
            });

            return response.data;
            

        } catch (error) {
            console.error(error);
        }
    }

    const handlePlaceOrder =async (e) => {
        e.preventDefault();
        if (checkbox !== null) {
            const cart = await getCartById(checkbox);
            const data = {
                quantity:cart.quantity,
                total:cart.totalbill,
                customer:cart.customer.id,
                product:cart.product.productid
            }
            PlaceOrder(data);
            deleteCart(cart.cartid);
            const updatedJsonData = jsonData.filter(data => data.cartid !== cart.cartid);
            setJsonData(updatedJsonData);
            setError("");
            setCheckbox(null)
        } else {
            setError("No checkbox selected.");
        }
    };



    return (
        <>
            <Title page="Add to Cart"></Title>
            <Clayout>
            {jsonData !== null && (

                <div className="overflow-x-auto">
                   <form onSubmit={handlePlaceOrder}>
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    Select
                                </th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {jsonData.map(cart => (
                            
                                
                        <tbody>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" checked={checkbox === cart.cartid} className="checkbox" value={cart.cartid} onChange={() => setCheckbox(cart.cartid)}/>
                                    </label>
                                </th>
                                <td>
                                <Link href={`./${cart.product.productid}`}>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={process.env.NEXT_PUBLIC_BACKEND_URL + `productpic/${cart.product.picture}`} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{cart.product.productname}</div>
                                            <div className="text-sm opacity-50">{cart.product.category}</div>
                                        </div>
                                    </div>
                                    </Link>
                                </td>
                                <td>
                                    {cart.quantity}
                                </td>
                                <td>{cart.product.productprice}</td>
                                <td>{cart.totalbill}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleCart(cart.cartid)} >Delete</button>
                                </th>
                            </tr>
                        </tbody>
                        ))}
                        <tfoot>
                            <tr>
                                <td colSpan={7} align="center">
                                    {error && <span className="text-red">{error}</span>}<br/>
                                    <button type="submit" className="btn btn-warning" value="Place Order" >Place Order</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    </form>
                </div>

            )}

            </Clayout>




        </>

    )
}