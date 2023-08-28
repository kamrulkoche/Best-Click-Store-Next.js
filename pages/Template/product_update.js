import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductUpdate({ product }) {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);

  const handleUpdate = async () => {
    try {
      const updatedProduct = { name, price, discount };
      await axios.put(`http://localhost:3000/employee/updateproduct/${id}`, updatedProduct);
      router.push("/product_view");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <label>
        
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br />
      <label>
        Discount:
        <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)} />
      </label>
      <br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const response = await axios.get(`http://localhost:3000/employee/getproductbyid/${id}`);
  const product = await response.data;

  return { props: { product } };
}
