import dynamic from "next/dynamic";
import Image from "next/image";

const Layout = dynamic(() => import('./best_click_store/layout/layout'), {
    ssr: false,
})

const Title = dynamic(() => import('./best_click_store/layout/title'), {
    ssr: false,
})

export default function Home() {
    return (
        <>
            <Title page='Home'></Title>
            <Layout>
                <p align='center'><Image src="/images/logo.png" alt="logo.png" width={500} height={400}></Image></p>
                <div className="flex">
                    <div className="card w-96 bg-base-100 shadow-xl m-5">
                        <figure><img src="/images/elec1.png" alt="Laptop" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">laptop!</h2>
                            <p>"Time, Tech, and Mobility Unite: Your Wrist, Your World, Connected."</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card w-96 bg-base-100 shadow-xl m-5">
                        <figure><img src="/images/elec2.png" alt="Watch" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Watch!</h2>
                            <p>"Time, Tech, and Mobility Unite: Your Wrist, Your World, Connected."</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="card w-96 bg-base-100 shadow-xl m-5">
                        <figure><img src="/images/elec4.png" alt="Phone" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Phone!</h2>
                            <p>"Time, Tech, and Mobility Unite: Your Wrist, Your World, Connected."</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>



                    <div className="card w-96 bg-base-100 shadow-xl m-5">
                        <figure><img src="/images/mouse.jpg" alt="Mouse" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Mouse!</h2>
                            <p>"Time, Tech, and Mobility Unite: Your Wrist, Your World, Connected."</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    )
}
