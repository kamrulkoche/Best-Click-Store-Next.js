import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <div className="navbar bg-primary-content">
                <div className="flex-1">
                    <Link href='/'><Image src="/images/logo.png" alt="logo.png" width={200} height={100} ></Image></Link>
                </div>
                <div className="flex-1">
                    <form >
                        <div className='relative'>
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <button className="bg-sky-500 hover:bg-sky-700 ..."><Image src="/images/search.jpg" alt="search.jpg" width={20} height={20} /></button>
                            </div>
                            <input type="text" placeholder="Search here" className="input input-bordered max-w-xs pl-10" name='search' />
                        </div>
                    </form>
                </div>
                <div className="flex-none pr-14">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="../best_click_store/login">Login</Link></li><a className='text-2xl'> | </a>
                        <li><Link href="../best_click_store/reg">Singup</Link></li>
                    </ul>
                </div>
            </div>

        </>
    )

}