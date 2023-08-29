import Productheader from "./productheader"
import Footer from "./footer";
export default function Productlayout (
    {children}
){
    return (
        <>
        <Productheader></Productheader>
        {children}
       <Footer></Footer>

       
        
       
        
        
        </>
    )

}