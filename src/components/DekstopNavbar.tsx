"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;
const DesktopNavbar = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const isScrollDown = scrollPosition > 10;
  return (
    <nav
      className={cn(
        "hidden bg-white text-gray-700 shadow-md transition-colors w-full z-50 top-0 md:flex justify-center items-center",
        {
          " fixed ": isScrollDown,
        }
      )}
    >
      <div className=" container mx-auto">
        {props.children}
      </div>
      <hr className="border-b border-gray-100 opacity-25 " />
    </nav>
  );
};

export default DesktopNavbar;