import dynamic from "next/dynamic";
import Productlayout from '../layout/productlayout';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
const Title = dynamic(() => import('../../best_click_store/layout/title'), {
    ssr: false,
})
const Clayout = dynamic(() => import('../layout/clayout'), {
    ssr: false,
})
export default function Home() {
    const [jsonData, setJsonData] = useState(null);
    const [checkbox, setCheckbox] = useState(null);


    useEffect(() => {
        getOrderByAdmin();
    }, []);




    async function getOrderByAdmin() {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'orderbycustomer', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    const handleOrder = async (orderid) => {
        deleteOrder(orderid);
        const updatedJsonData = jsonData.filter(order => order.orderid !== orderid);
        setJsonData(updatedJsonData);
    }


    async function deleteOrder(id) {
        try {
            const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL + `deleteorder/${id}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // async function getOrderById(id) {
    //     try {
    //         const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `orderbyid/${id}`, {
    //             withCredentials: true
    //         });

    //         return response.data;
            

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    // async function PlaceOrder(data) {
    //     try {
    //         const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + `addorder`,data, {
    //             withCredentials: true
    //         });

    //         return response.data;
            

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const handlePlaceOrder =async (e) => {
    //     e.preventDefault();
    //     if (checkbox !== null) {
    //         const cart = await getCartById(checkbox);
    //         const data = {
    //             quantity:cart.quantity,
    //             total:cart.totalbill,
    //             customer:cart.customer.id,
    //             product:cart.product.productid
    //         }
    //         PlaceOrder(data);
    //         deleteCart(cart.cartid);
    //         const updatedJsonData = jsonData.filter(data => data.cartid !== cart.cartid);
    //     setJsonData(updatedJsonData);

    //         console.log("Selected Checkbox:", data);
    //         // Here you can process the selected checkbox value, such as sending it to the backend for order placement.
    //     } else {
    //         console.log("No checkbox selected.");
    //     }
    // };



    return (
        <>
            <Title page="Add to Cart"></Title>
            <Clayout>

            {jsonData !== null && (
                
                <div className="overflow-x-auto">
                    <h1 align="center" className="text-2xl p-4">Orders</h1>
                   <form >
                    <table className="table my-4">
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
                        {jsonData.map(order => (
                            
                                
                        <tbody>{console.log(order)}

                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" checked={checkbox === order.orderid} className="checkbox" value={order.orderid} onChange={() => setCheckbox(order.orderid)}/>
                                        {console.log(checkbox)}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={process.env.NEXT_PUBLIC_BACKEND_URL + `productpic/${order.product.picture}`} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{order.product.productname}</div>
                                            <div className="text-sm opacity-50">{order.product.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {order.quantity}
                                </td>
                                <td>{order.product.productprice}</td>
                                <td>{order.total}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleOrder(order.orderid)} >Delete</button>
                                </th>
                            </tr>
                        </tbody>
                        ))}
                        <tfoot>
                            <tr>
                                <td colSpan={7} align="center">
                                    <p><button type="submit" className="btn btn-warning" value="Make Payment" >Make Payment</button></p>
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