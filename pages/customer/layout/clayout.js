import Cheader from "./cheader";
import Footer from "./footer";
export default function Clayout (
    {children}
){
    return (
        <>
        <Cheader></Cheader>
        {children}
       <Footer></Footer>

       
        
       
        
        
        </>
    )

}