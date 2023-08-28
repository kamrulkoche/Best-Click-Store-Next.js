
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const Title = dynamic(() => import('../../best_click_store/layout/title'), {
  ssr: false,
})
const Clayout = dynamic(() => import('../layout/clayout'), {
  ssr: false,
})
export default function Home() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);




  async function getProduct() {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + 'product', {
        withCredentials: true
      });
      const jsonData = response.data;
      setJsonData(jsonData);

      console.log(jsonData);

    } catch (error) {
      console.error(error);
    }
  }

  async function getCart(pid) {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + `cart/${pid}`, {
        withCredentials: true
      });
      if (response.data == false) {
        addToCart(pid);
      } 
      else {
        if (Array.isArray(response.data)) {
          console.log("get Cart", response.data);
          {response.data.map(cart => {
              const cartid = cart.cartid;
              const quantity = cart.quantity + 1;
              const totalbill = cart.product.productprice * quantity;
              const data = {
                quantity: quantity,
                totalbill: totalbill
              }
              updateCart(cartid, data);
            })
          }
        }
      }














    } catch (error) {
      console.error(error);
    }
  }


  async function updateCart(id, data) {
    try {
      const response = await axios.put(process.env.NEXT_PUBLIC_BACKEND_URL + `cart/${id}`, data, {
        withCredentials: true
      });
      console.log(response.data);
      












    } catch (error) {
      console.error(error);
    }
  }


  const handleCart = async (pid) => {
    getCart(pid);

  }


  async function addToCart(pid) {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + `cart/${pid}`, {
        withCredentials: true
      });

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  }








  return (

    <>
      <Title page="Dashboard"></Title>
      <Clayout>
        
        {jsonData !== null && (
          <div className="m-4">
            <h1 align="center">Welcome to our Page</h1>
            {jsonData.map(product =>

              <div className="card w-60 bg-base-100 shadow-xl flex float-left ml-4 h-80">
                <figure><img src={process.env.NEXT_PUBLIC_BACKEND_URL + `productpic/${product.picture}`} height="250" width="250" alt="Laptop" /></figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {product.productname}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => handleCart(product.productid)}>Add to cart</button>
                  </div>
                </div>
              </div>

            )}
          </div>
        )}




      </Clayout>






    </>

  )
}