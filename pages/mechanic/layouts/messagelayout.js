import MechanicHeader from "./mechanicheader";
import MechanicFooter from "./mechanicfooter";
export default function MessageLayout({children}) {
    return (
      <>

        <MechanicHeader/>
        {children}
        
        <MechanicFooter/>

        
      </>
    )
  }