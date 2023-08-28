import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';


//const Layout = dynamic(() => import('./Index Layout/layout'), {ssr: false,})

const Title = dynamic(() => import('./Index Layout/title'), {ssr: false,})


export default function Home() {
  return (
    <>
      <Title page="Home"></Title>


      <div className="navbar bg-base-300 rounded-box">
                <div className="flex-1 px-4 lg:flex-none">
                    <a className="text-lg font-bold">BEST CLICK STORE</a>
                </div>
                <div className="flex justify-end flex-1 px-2">
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost rounded-btn" href='/'>Home </a>
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost rounded-btn" href='./Template/sign_in'>Sign In </a>
                        <div className="flex items-stretch">
                            <a className="btn btn-ghost rounded-btn" href='./Template/sign_up'>Sign Up</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>





    </>
  );
}
