import dynamic from "next/dynamic";

import Productlayout from '../layout/productlayout';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
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
    const router = useRouter();


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
        let confirmAction = confirm(`Are you sure you want to cancel your order? \nThis action cannot be undone.`);
        if (confirmAction) {
            deleteOrder(orderid);
            const updatedJsonData = jsonData.filter(order => order.orderid !== orderid);
            setJsonData(updatedJsonData);
        }
        else {

        }
    }


    const handleChangePayment = async (paymentid) => {
        let confirmAction = confirm(`Are you sure you want to change your payment datails?`);
        if (confirmAction) {
            
        }
        else {

        }
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

    

    const handlePayment = async (e) => {
        e.preventDefault();
        if (checkbox !== null) {
            router.push({
                pathname: './payment',
                query: {
                    oid:checkbox
                },
            });
            setError("");


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
                        <h1 align="center" className="text-2xl p-4">Orders</h1>
                        <form onSubmit={handlePayment}>
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
                                        <th>Payment Method</th>
                                        <th>Status</th>
                                        <th>Cancel order</th>
                                    </tr>
                                </thead>
                                {jsonData.map(order => (


                                    <tbody>{console.log(order)}
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" checked={checkbox === order.orderid} className="checkbox" value={order.orderid} onChange={() => setCheckbox(order.orderid) } disabled={order.payment != null}/>
                                                    {console.log(checkbox)}
                                                </label>
                                            </th>
                                            <td>
                                                <Link href={`./${order.product.productid}`}>
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
                                                </Link>
                                                
                                            </td>
                                            <td>
                                                {order.quantity}
                                            </td>
                                            <td>{order.product.productprice}</td>
                                            <td>{order.total}</td>
                                            <td>{order.payment != null &&(order.payment.payment_method)}{order.payment == null &&("Not selected")}</td>
                                            <td>{order.payment != null &&(order.payment.status)}{order.payment == null &&("Not selected")}</td>
                                            <th>
                                                <button className="btn btn-ghost btn-xs" onClick={() => handleOrder(order.orderid)} style={{ display: order.payment ? 'none' : 'inline' }}>Cancel order</button>
                                                <button className="btn btn-ghost btn-xs" onClick={() => handleChangePayment(order.payment!= null && (order.payment.payment_id))} style={{ display: order.payment ? 'inline' : 'none' }}>Change Payment</button>
                                            </th>
                                        </tr>
                                    </tbody>
                                ))}
                                <tfoot>
                                    <tr>
                                        <td colSpan={9} align="center">
                                            {error && <span className="text-red-400">{error}</span>}<br/>
                                            <button type="submit" className="btn btn-warning" value="Make Payment" >Make Payment</button>
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