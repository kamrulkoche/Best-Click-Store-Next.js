import axios from "axios";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react"; // Import useState
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from '../session/session';

const Title = dynamic(() => import('../Layout/title'), { ssr: false, })
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false, })


export default function GetUsers({ data }) {

    const { logout } = useAuth();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    // Filter the data based on the search query
    const filteredData = data.filter((item) =>
        item.id.toString().includes(searchQuery) ||
        item.name.toString().includes(searchQuery) ||
        item.price.toString().includes(searchQuery) ||
        item.discount.toString().includes(searchQuery)
    );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDeleteUser = async (id) => {
        try {

            const response = await axios.delete(`http://localhost:3000/employee/deleteproduct/${id}`);
            // After successful deletion, you may want to update the UI or refetch the data.
            // For simplicity, you can refresh the page:

            router.push('product_view');
            //router.reload();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {

        getProfile();


        // setFname(sessionStorage.getItem("fname"));
        // setfilename(sessionStorage.getItem("filename"));
        // setLname(sessionStorage.getItem("lname"));


    }, []);

    async function getProfile() {
        try {
            const response = await axios.get('http://localhost:3000/employee/profile', {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error(error);
        }
    }
    // console.log(`${image}getimage/${filename}`);

    const handleLogout = () => {
        logout();
        //router.push('sign_in');
    };



    return (
        <>
            <Title page="Dashboard"></Title>

            <Layout>

                {jsonData !== null && (
                    <div>


                        {/* total grid colos number   */}
                        <div class="grid grid-cols-6">


                            {/* First col number Start*/}
                            <div class="col-span-1" >

                                <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100">
                                    <div className="flex items-center p-2 space-x-4">
                                        <img width={100} height={100} src={`http://localhost:3000/employee/getimage/${jsonData.filename}`} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                                        <div>
                                            <h2 className="text-lg font-semibold">


                                                {jsonData.fname}  {jsonData.lname}


                                            </h2>
                                            <span className="flex items-center space-x-1">
                                                <Link rel="noopener noreferrer" href="user_profile" className="text-xs hover:underline dark:text-gray-400">View profile</Link>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-700">
                                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                                            <li className="dark:bg-gray-800 dark:text-gray-50">
                                                <Link rel="noopener noreferrer" href="dashboard" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                                                    </svg>
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link rel="noopener noreferrer" href="all_user_view" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg
                                                        fill="#000000"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.67 0-5.07 1.04-6.9 2.73a7.95 7.95 0 0 0 0 10.54C6.93 14.96 9.33 16 12 16s5.07-1.04 6.9-2.73a7.95 7.95 0 0 0 0-10.54C17.07 5.04 14.67 4 12 4zm0 12.12a4.12 4.12 0 1 1 0-8.24 4.12 4.12 0 0 1 0 8.24zm0-2.84a1.28 1.28 0 0 1-1.28-1.28A1.28 1.28 0 0 1 12 9.16a1.28 1.28 0 0 1 1.28 1.28A1.28 1.28 0 0 1 12 11.28z"
                                                        />
                                                    </svg>

                                                    <span>View users</span>
                                                </Link>
                                            </li>


                                            <li>
                                                <Link rel="noopener noreferrer" href="product_add" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg
                                                        fill="#000000"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                                                        />
                                                    </svg>

                                                    <span>Add product </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link rel="noopener noreferrer" href="product_view" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg
                                                        fill="#000000"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        width="24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14a6 6 0 0 0-6 6c0 2.58 1.64 4.79 4 5.66V14a2 2 0 1 1 4 0v-2.34c2.36-.87 4-3.08 4-5.66a6 6 0 0 0-6-6zm0 10a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4zm0-6a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"
                                                        />
                                                    </svg>


                                                    <span>View product </span>
                                                </Link>
                                            </li>


                                            <li>
                                                <Link rel="noopener noreferrer" href="help_line" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                                                        <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                                                    </svg>
                                                    <span>Chat</span>
                                                </Link>
                                            </li>

                                        </ul>
                                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                                            <li>
                                                <Link rel="noopener noreferrer" href="change_password" className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                                                        <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                                                    </svg>


                                                    <span>Change password</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link rel="noopener noreferrer" href="" onClick={handleLogout} className="flex items-center p-2 space-x-3 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                                        <rect width="32" height="64" x="256" y="232"></rect>
                                                    </svg>
                                                    <span>Logout</span>

                                                </Link>

                                            </li>
                                        </ul>


                                    </div>

                                </div>

                            </div>

                            {/* First col number End */}



                            {/* Second  col number Start */}
                            <div class="col-span-5">

                                <div className=" mx-40 my-6" >
                                    <h3 align="right">
                                        <input type="text" value={searchQuery}
                                            placeholder="Search Product" className="input input-bordered input-sm w-full max-w-xs"
                                            onChange={handleSearchChange} />
                                    </h3>
                                    <br></br>
                                   
                                    <div className="bg-white-200 " >
                                            {filteredData.map((item) => (
                                               
                                                   


                                                        <div className="card w-60  bg-base-100 shadow-xl m-3 float-left">
                                                            

                                                            <div className="img">
                                                            <img src={`http://localhost:3000/employee/getproduct/${item.filename}`} alt="" width={200} height={200} />
                                                            </div>
                                                            <div className="card-body">
                                                                <h2 className="card-title">
                                                                {item.name}
                                                                    <div className="badge badge-secondary">NEW</div>
                                                                </h2>
                                                                <p>Offer price</p>
                                                                <div className="card-actions justify-end">
                                                                    <div >Price: ${item.price}</div>
                                                                    <div className="badge badge-outline">Discount:{item.discount}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                  
                                               
                                            ))}
                                      
                                            </div>
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
    const response = await axios.get("http://localhost:3000/employee/allproductview");
    const data = await response.data;

    return { props: { data } };
}
