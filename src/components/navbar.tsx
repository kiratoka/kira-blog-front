import { getSession } from "@/lib/session";
import Link from "next/link";
import SignInPanel from "./SignInPanel";
import Profile from "./Profile";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getSession();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-cyan-100 shadow-lg shadow-cyan-500/5">
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
              <NavLink href="/" label="Blog" />
              <NavLink href="#about" label="About" />
              <NavLink href="#contact" label="Contact" />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-cyan-300 to-transparent mx-2" />

            {/* Auth Section */}
            {session && session.user ? (
              <Profile user={session.user} />
            ) : (
              <SignInPanel />
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenuButton session={session} />
          </div>
        </div>

        {/* Mobile Navigation - Hidden by default, shown via client component */}
        <MobileNav session={session} />
      </div>

      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
    </nav>
  );
};

// Desktop Nav Link Component
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="group relative px-4 py-2 text-slate-700 font-medium rounded-xl hover:text-cyan-600 transition-all duration-300 overflow-hidden"
  >
    {/* Hover Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

    {/* Text */}
    <span className="relative z-10 flex items-center gap-2">
      {label}
      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </span>

    {/* Bottom Border */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-300" />
  </Link>
);

// Mobile Menu Button Component (Client Component needed for state)
const MobileMenuButton = ({ session }: { session: any }) => (
  <button
    className="p-2 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300"
    aria-label="Toggle menu"
  >
    <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
);

// Mobile Navigation Component
const MobileNav = ({ session }: { session: any }) => (
  <div className="md:hidden border-t border-cyan-100 py-4 space-y-2">
    <MobileNavLink href="/" label="Blog" />
    <MobileNavLink href="#about" label="About" />
    <MobileNavLink href="#contact" label="Contact" />

    <div className="h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent my-4" />

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
const MobileNavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300"
  >
    <span className="text-slate-700 font-medium group-hover:text-cyan-600 transition-colors">
      {label}
    </span>
    <div className="w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
  </Link>
);

export default Navbar;