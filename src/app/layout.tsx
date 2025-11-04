import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DesktopNavbar from "@/components/DekstopNavbar";
import Navbar from "@/components/navbar";
import NavbarContainer from "@/components/NavbarContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kira Blog",
  description: "Share your ideas into to the flawless world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>

        {children}
      </body>
    </html>
  );
}
