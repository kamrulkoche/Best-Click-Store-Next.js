import axios from "axios";
import { useState } from "react"; // Import useState
import { useRouter } from "next/router";
import Link from "next/link";

export default function GetUsers({ data }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Filter the data based on the search query
  const filteredData = data.filter((item) =>
    item.id.toString().includes(searchQuery) ||
    item.fname.toString().includes(searchQuery) ||
    item.lname.toString().includes(searchQuery) ||
    item.email.toString().includes(searchQuery) ||
    item.phone.toString().includes(searchQuery)
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${id}`);
  
      router.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>


      {/* <h1 align="center">All User View</h1>

      <h3 align="center">
        Search <input type="text" value={searchQuery} onChange={handleSearchChange} />
      </h3>

      <table align="center" border={5}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
          </tr>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={`http://localhost:3000/employee/getimage/${item.filename}`} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.fname} {item.lname}</div>
                  </div>
                </div>
              </td>


              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">

                  </div>
                  <div>
                    <div className="font-bold">{item.gender}</div>
                  </div>
                </div>
              </td>

              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">

                  </div>
                  <div>
                    <div className="font-bold">{item.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">

                  </div>
                  <div>
                    <div className="font-bold">{item.phone}</div>
                  </div>
                </div>
              </td>


              <td>
                <button onClick={() => handleDeleteUser(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 */}






      <div className=" mx-40 my-6" >
        <h1 className="font-bold m-5 text-red-950
      " align="center" >All User  List</h1>

        <h3 align="center">
          <input type="text" value={searchQuery}
            placeholder="Search" className="input input-bordered input-success w-full max-w-xs"

            onChange={handleSearchChange} />
        </h3>

        <table className="table">
          <tbody>
            <tr className="bg-yellow-200">
              <th>Admin</th>
              <th>Name</th>
              <th>Gender</th> {/* Corrected the table header */}
              <th>Email</th>
              <th>Phone</th> {/* Add Edit header */}
              

            </tr>
            {filteredData.map((item) => (
              <tr key={item.id} className="bg-blue-200">
                <td>
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={`http://localhost:3000/admin/getimage/${item.filename}`} alt="Avatar Tailwind CSS Component" />
                  </div>
                </td>
                <td>{item.fname} {item.lname}</td>
                <td>{item.gender}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>





    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:3000/admin/allregistrationview");
  const data = await response.data;

  return { props: { data } };
}
