import { DEKSTOP_NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";


const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-slate-100",
        `md:h-[calc(100vh-${DEKSTOP_NAVBAR_HEIGHT})]`
      )}
    >
      {children}
    </div>
  );
};

export default AuthLayout;