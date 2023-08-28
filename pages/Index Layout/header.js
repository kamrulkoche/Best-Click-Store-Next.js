import Link from 'next/link';
import Image from 'next/image';


export default function Header() {
    return (
        <>
            <div className="navbar bg-base-300 rounded-box">
                <div className="flex-1 px-4 lg:flex-none">
                    <a className="text-lg font-bold">BEST CLICK STORE</a>
                </div>
                <div className="flex justify-end flex-1 px-2">
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost rounded-btn" href='/'>Home </a>
                    <div className="flex items-stretch">
                        <a className="btn btn-ghost rounded-btn" href='./sign_in'>Sign In </a>
                        <div className="flex items-stretch">
                            <a className="btn btn-ghost rounded-btn" href='./sign_up'>Sign Up</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>


{/* 
            <div align="left">
                <Image
                    src="/best_click.png"
                    alt="logo"
                    width={200}
                    height={100}
                />
            </div> */}






        </>
    );
}
