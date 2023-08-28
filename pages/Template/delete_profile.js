import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Title = dynamic(() => import('../Layout/title'), { ssr: false });
const Layout = dynamic(() => import('../Layout/layout'), { ssr: false });

export default function Delete_profile() {
    const router = useRouter();
    //   const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        // setLoading(true);
        try {
            const id = sessionStorage.getItem('id'); // Retrieve the user ID from sessionStorage
            await axios.delete("http://localhost:3000/admin/users/" + id);
            //   console.log("DONE!");
            router.push('sign_in');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Title page="Delete Profile" />
            <Layout>
                <fieldset >
                    <div align="center">
                        <h1>Deleting account</h1>
                        <p>Deleting  your account will remove all of your information from our database.<br></br>This action cannot be undone. <br></br>Are you sure you want to continue? </p>

                        <button onClick={handleDelete}>
                            <h3>Continue</h3>
                        </button>
                    </div>

                    <div>
                        <button><a href='dashboard'><h3 align="left">Cancel</h3></a></button>
                    </div>

                </fieldset>

            </Layout>
        </>
    );
}
