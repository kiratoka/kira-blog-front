import { Session } from "@/lib/session";
import Link from "next/link";
import SignInPanel from "./SignInPanel";
import Profile from "./Profile";

// Helper for color classes depending on homepage & scroll state
function navbarTextColor(isHomePage: boolean, isScrollDown: boolean) {
  // Homepage & NOT scroll -> text white
  if (isHomePage && !isScrollDown) return "text-white";
  // Else (not homepage or scroll down) -> text-slate-700
  return "text-slate-700";
}
function navbarBgColor(isHomePage: boolean, isScrollDown: boolean) {
  // Homepage & not scroll -> transparent bg
  if (isHomePage && !isScrollDown) return "bg-transparent";
  // Else -> bg-white (original)
  return "bg-white";
}

const Navbar = ({
  session,
  isHomePage = false,
  isScrollDown = false,
}: {
  session: Session | null;
  isHomePage?: boolean;
  isScrollDown?: boolean;
}) => {
  const textClass = navbarTextColor(isHomePage, isScrollDown);
  const bgClass = navbarBgColor(isHomePage, isScrollDown);

  return (
    <nav
      className={`sticky top-0 z-50 shadow-cyan-500/5 transition-colors duration-300 ${bgClass}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Futuristic Design */}
          <Link href="/" className="group relative">
            <div className="flex items-center gap-3">
              {/* Cyber Icon */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-xl group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:rotate-6">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                {/* Pulse Ring */}
                <div className="absolute inset-0 bg-cyan-400 rounded-lg opacity-0 group-hover:opacity-20 animate-ping" />
              </div>

              {/* Logo Text */}
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Kira Blog
                </h1>
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {/* Nav Links */}
            <div className="flex items-center gap-1">
              <NavLink
                href="/"
                label="Blog"
                textClass={textClass}
                isHomePage={isHomePage}
                isScrollDown={isScrollDown}
              />
              <NavLink
                href="#about"
                label="About"
                textClass={textClass}
                isHomePage={isHomePage}
                isScrollDown={isScrollDown}
              />
              <NavLink
                href="#contact"
                label="Contact"
                textClass={textClass}
                isHomePage={isHomePage}
                isScrollDown={isScrollDown}
              />
            </div>

            {/* Divider */}
            <div
              className={`h-8 w-px bg-gradient-to-b from-transparent via-cyan-300 to-transparent mx-2`}
            />

            {/* Auth Section */}
            {session && session.user ? (
              <Profile user={session.user} />
            ) : (
              <SignInPanel />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
           
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav session={session} textClass={textClass} isHomePage={isHomePage} isScrollDown={isScrollDown} />
      </div>

    
    </nav>
  );
};

// Desktop Nav Link Component
const NavLink = ({
  href,
  label,
  textClass,
  isHomePage = false,
  isScrollDown = false,
}: {
  href: string;
  label: string;
  textClass?: string;
  isHomePage?: boolean;
  isScrollDown?: boolean;
}) => (
  <Link
    href={href}
    className={`group relative px-4 py-2 font-medium rounded-xl hover:text-cyan-400 transition-all duration-300 overflow-hidden ${textClass ? textClass : "text-slate-700"}`}
  >
    {/* Hover Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 opacity-0 transition-opacity duration-300 rounded-xl" />

    {/* Text */}
    <span className="relative z-10 flex items-center gap-2">
      {label}
      <div className={`w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-0 transition-opacity`} />
    </span>

    {/* Bottom Border */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-300" />
  </Link>
);

// Mobile Menu Button Component

// Mobile Navigation Component
const MobileNav = ({
  session,
  textClass,
  isHomePage = false,
  isScrollDown = false,
}: {
  session: Session | null;
  textClass?: string;
  isHomePage?: boolean;
  isScrollDown?: boolean;
}) => (
  <div
    className={`md:hidden border-t py-4 space-y-2 ${
      isHomePage && !isScrollDown
        ? "border-white/20"
        : "border-cyan-100"
    }`}
  >
    <MobileNavLink href="/" label="Blog" textClass={textClass} isHomePage={isHomePage} isScrollDown={isScrollDown} />
    <MobileNavLink href="#about" label="About" textClass={textClass} isHomePage={isHomePage} isScrollDown={isScrollDown} />
    <MobileNavLink href="#contact" label="Contact" textClass={textClass} isHomePage={isHomePage} isScrollDown={isScrollDown} />

    <div className={`h-px my-4 ${isHomePage && !isScrollDown
      ? "bg-gradient-to-r from-transparent via-white/60 to-transparent"
      : "bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
    }`} />

    <div className="px-2">
      {session && session.user ? (
        <Profile user={session.user} />
      ) : (
        <SignInPanel />
      )}
    </div>
  </div>
);

// Mobile Nav Link Component
const MobileNavLink = ({
  href,
  label,
  textClass,
  isHomePage = false,
  isScrollDown = false,
}: {
  href: string;
  label: string;
  textClass?: string;
  isHomePage?: boolean;
  isScrollDown?: boolean;
}) => (
  <Link
    href={href}
    className={`group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 ${
      isHomePage && !isScrollDown
        ? "text-white"
        : "text-slate-700"
    }`}
  >
    <span
      className={`font-medium group-hover:text-cyan-400 transition-colors ${
        isHomePage && !isScrollDown
          ? "text-white"
          : "text-slate-700"
      }`}
    >
      {label}
    </span>
    <div
      className={`w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
    />
  </Link>
);

export default Navbar;