"use client";
import { DEKSTOP_NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "./navbar";
import { Session } from "@/lib/session";


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

  const isScrollDown = scrollPosition > 10;
  return (
    <nav
      className={cn(
        `h-[${DEKSTOP_NAVBAR_HEIGHT}] hidden bg-white text-gray-700 shadow-md w-full z-50 top-0 md:flex justify-center items-center`,
        isScrollDown && "fixed"
      )}
    >
      <div className=" container mx-auto">
        <Navbar session={session} />
      </div>
      <hr className="border-b border-gray-100 opacity-25 " />
    </nav>
  );
};

export default DesktopNavbar;