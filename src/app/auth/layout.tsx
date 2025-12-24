import NavbarContainer from "@/components/NavbarContainer";
import { DEKSTOP_NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";


const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        "flex flex-col h-screen",

      )}

    >
      <NavbarContainer />
      {children}
    </div>
  );
};

export default AuthLayout;