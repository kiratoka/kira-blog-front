"use client";


import { DEKSTOP_NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Session } from "@/lib/session";
import { usePathname } from "next/navigation";


const DesktopNavbar = ({ session }: { session: Session | null }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  // Penggunaan useEffect untuk menambahkan event listener scroll seperti ini umumnya aman,
  // selama kita melakukan clean-up (removeEventListener) pada return useEffect,
  // yang sudah dilakukan di sini.
  // Namun, disarankan untuk menambahkan dependencies array ([], atau [handleScroll] jika perlu)
  // agar event listener hanya ditambahkan sekali saat komponen mount,
  // sehingga tidak terjadi penambahan listener yang tidak perlu pada setiap render.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // tambahkan dependencies array untuk performa & keamanan


  const pathname = usePathname();
  const isHomePage = pathname === "/";

  
  const isScrollDown = scrollPosition > 10;
  return (
    <nav
      className={cn(
        `h-[${DEKSTOP_NAVBAR_HEIGHT}] hidden bg-white text-gray-700 w-full z-50 top-0 md:flex justify-center items-center`,
        isHomePage && !isScrollDown
          ? "absolute bg-transparent"
          : isScrollDown
            ? "fixed"
            : ""
      )}
    >
      <div className=" container mx-auto">
        <Navbar isScrollDown={isScrollDown} isHomePage={isHomePage} session={session} />
      </div>
     
    </nav>
  );
};

export default DesktopNavbar;