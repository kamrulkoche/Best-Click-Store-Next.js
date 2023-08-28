
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../session/session';
import { useRouter } from 'next/router';
export default function Header() {


  const { logout } = useAuth();
  const router = useRouter();


  const image = process.env.NEXT_PUBLIC_BACKEND_URL;

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
      <div className="navbar bg-blue-300 ">
        <div className="flex-1 px-4 lg:flex-none">

          <a rel="noopener noreferrer" href="/" aria-label="Back to homepage" className="flex items-center p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 dark:text-violet-400">
              <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
              <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
            </svg>
          </a>

          <a className="text-lg font-bold">BEST CLICK STORE</a>

        </div>
        <div className="flex justify-end flex-1 px-2">
          <div className="flex items-stretch">
            <div className="flex items-stretch">
              <a className="self-center px-8 py-3 rounded" href='/'>Home</a>
              <div className="flex items-stretch">
                <a className="self-center px-8 py-3 rounded" href='./dashboard'>Dashboard</a>
              </div>

              <div className="flex items-stretch">

                {jsonData !== null && (
                  <div>
                    <div className="navbar ">
                      <div className="flex-1">
                      </div>
                      <div className="flex-none">

                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                            <div className="w-50 rounded-full">
                              <img width={100} height={100} src={`http://localhost:3000/admin/getimage/${jsonData.filename}`} alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                            

                            </div>

                          </label>

                          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                              <span className="flex items-center space-x-1">
                                <Link rel="noopener noreferrer" href="user_profile" >View profile</Link>
                              </span>
                            </li>
                            <li>
                              <span className="flex items-center space-x-1">
                                <Link rel="noopener noreferrer" href="adduser_view" >View User</Link>
                              </span>
                            </li>
                            <li>
                              <span className="flex items-center space-x-1">
                                <Link rel="noopener noreferrer" href="user_add" >Add User</Link>
                              </span>
                            </li>
                            <li>
                              <span className="flex items-center space-x-1">
                                <Link rel="noopener noreferrer" href="change_password" >Change Password</Link>
                              </span>
                            </li>

                            <li>
                              <Link rel="noopener noreferrer" href="" onClick={handleLogout} className="flex items-center space-x-1">

                                <span>Logout</span>

                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>
                )
                }

              </div>
            </div>
          </div>
        </div>
      </div>
 
    </>
  );
}



