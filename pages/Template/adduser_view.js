import axios from "axios";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react"; // Import useState
import { useRouter } from "next/router";
import Link from "next/link";

const Title = dynamic(() => import('../Layout/title'), { ssr: false, })
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false, })


export default function GetUsers({ data }) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");


  const filteredData = data.filter((item) =>
    item.id.toString().includes(searchQuery) ||
    item.name.toString().includes(searchQuery) ||
    item.email.toString().includes(searchQuery) ||
    item.address.toString().includes(searchQuery)
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteUser = async (id) => {
    try {

      const response = await axios.delete(`http://localhost:3000/admin/deletemanager/${id}`);


      router.push('adduser_view');
      //router.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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


  const handleLogout = () => {
    logout();
    // router.push('sign_in');
  };



  return (
    <>
      <Title page="View User"></Title>

      <Layout>

        {jsonData !== null && (
          <div>

            <div class="grid grid-cols-12">

              <div class="col-span-11">

                <div className=" mx-40 my-6" >
                  <h3 align="center">
                    <input type="text" value={searchQuery}
                      placeholder="Search User" className="input input-bordered input-success w-full max-w-xs"
                      onChange={handleSearchChange} />
                  </h3>
                  <br></br>
                  <table className="table">
                    <tbody>
                      <tr className="bg-red-200">
                        <th>ID</th>
                        <th className="text-center">Name</th>
                        <th>Email</th> {/* Corrected the table header */}
                        <th>Address</th>
                        <th>Edit</th> {/* Add Edit header */}
                        <th>Delete</th>
                      </tr>
                      {filteredData.map((item) => (
                        <tr key={item.id} className="bg-green-200">
                          <td>{item.id}</td>
                          <td className="text-center">{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.address}</td>
                          <td>
                            <Link href={`../item/${item.id}`}>
                              Edit
                            </Link>
                          </td>
                          <td >
                            <button onClick={() => handleDeleteUser(item.id)} class="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-red-900">Delete</button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>



              </div>

              {/* Second col number End */}
            </div>

            {/* total grid colos number  end */}




          </div>
        )
        }

      </Layout>

    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:3000/admin/alluser");
  const data = await response.data;

  return { props: { data } };
}
