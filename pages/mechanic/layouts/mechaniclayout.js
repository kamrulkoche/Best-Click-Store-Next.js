import MechanicHeader from "./mechanicheader";
import MechanicFooter from "./mechanicfooter";
import MechanicNavigation from "./mechanicnavigation";
export default function MechanicLayout({children}) {
    return (
      <>

        <MechanicHeader/>
        <MechanicNavigation>{children}</MechanicNavigation>
        
        <MechanicFooter/>

        
      </>
    )
  }