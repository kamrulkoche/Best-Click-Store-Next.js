
import Dashboard from './../Template/dashboard';
import Link from 'next/link';
export default function Header() {
  return (
    <>
      <div className="navbar bg-base-300 rounded-box">
        <div className="flex-1 px-4 lg:flex-none">
          <Link className="text-lg font-bold" href="">BEST CLICK STORE</Link>
        </div>
        <div className="flex justify-end flex-1 px-2">
          <div className="flex items-stretch">
            <Link className="btn btn-ghost rounded-btn" href='/'>Home </Link>
            <div className="flex items-stretch">
              <Link className="btn btn-ghost rounded-btn" href='./dashboard'>Dashboard </Link>
              {/* <div className="flex items-stretch">
                <Link className="btn btn-ghost rounded-btn" href='/'>Log Out</Link>
              </div> */}
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



