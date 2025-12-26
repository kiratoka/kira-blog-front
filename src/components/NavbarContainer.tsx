import { PropsWithChildren } from "react";
import DesktopNavbar from "./DekstopNavbar";
import MobileNavbar from "./MobileNavbar";
import { getSession } from "@/lib/session";



type Props = PropsWithChildren;
const NavbarContainer = async () => {
  const session = await getSession()
 
  


  
  return (
    <div className="md:flex relative">
      <DesktopNavbar session={session} />
      <MobileNavbar session= {session}/>
    </div>
  );
};

export default NavbarContainer;