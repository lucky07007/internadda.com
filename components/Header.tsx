"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User, CreditCard, ChevronDown, Zap, Search } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { name: "Internships", href: "/internships" },
  { name: "Courses", href: "/courses" },
  { name: "Journal", href: "/blog" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const handleSignOut = async () => { await signOut(); router.push("/"); };

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const userInitial = (user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase();
  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "Account";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-200 top-0 font-sans ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="flex flex-col">
               <span className="text-2xl font-extrabold tracking-tight text-gray-900 leading-none group-hover:text-sky-500 transition-colors">
                 InternAdda
               </span>
               <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest mt-0.5">Global Placements</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-semibold transition-colors ${
                    active ? "text-sky-500" : "text-gray-600 hover:text-sky-500"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search..." className="w-48 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:bg-white text-gray-700 transition-all"/>
            </div>

            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all outline-none shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
                      {userInitial}
                    </div>
                    <span className="text-[13px] font-bold text-gray-700 max-w-[80px] truncate">{userName}</span>
                    <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 p-2 rounded-2xl border border-gray-100 shadow-xl bg-white font-sans" align="end" sideOffset={8}>
                  <DropdownMenuLabel className="px-3 py-2 mb-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-md font-bold flex-shrink-0">
                        {userInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-bold text-gray-900 truncate">{user?.user_metadata?.full_name || "Student"}</p>
                        <p className="text-[11px] font-medium text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-100 mx-1" />
                  <DropdownMenuGroup className="py-1">
                    <DropdownMenuItem onClick={() => router.push("/profile")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-sky-50 focus:bg-sky-50 text-gray-700 hover:text-sky-600 transition-colors">
                      <User size={16} /> <span className="text-[14px] font-bold">My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/orders")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-sky-50 focus:bg-sky-50 text-gray-700 hover:text-sky-600 transition-colors">
                      <CreditCard size={16} /> <span className="text-[14px] font-bold">My Enrollments</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-gray-100 mx-1" />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-red-50 focus:bg-red-50 text-red-500 transition-colors">
                    <LogOut size={16} /> <span className="text-[14px] font-bold">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/signin" className="text-[15px] font-bold text-gray-600 hover:text-sky-500 transition-colors px-4 py-2 rounded-xl hover:bg-sky-50">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-6 py-2.5 bg-sky-500 text-white text-[15px] font-bold rounded-xl hover:bg-sky-600 transition-colors shadow-md shadow-sky-500/20">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600 hover:bg-sky-50 hover:text-sky-500 rounded-xl transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="h-20" />

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[99] md:hidden transition-all duration-300 ${ isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" }`}>
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute left-0 right-0 top-20 bg-white shadow-2xl rounded-b-3xl overflow-hidden transition-transform duration-300 font-sans ${ isOpen ? "translate-y-0" : "-translate-y-8" }`}>
          <div className="p-4 flex flex-col gap-2 border-b border-gray-100">
             {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-[16px] font-bold transition-colors ${ active ? "text-sky-600 bg-sky-50" : "text-gray-700 hover:bg-gray-50" }`}
                  >
                    {link.name}
                  </Link>
                );
             })}
          </div>
          <div className="p-6 bg-gray-50">
            {user ? (
               <div className="flex flex-col gap-3">
                 <Link href="/profile" onClick={() => setIsOpen(false)} className="w-full text-center px-4 py-3 bg-white border border-gray-200 rounded-xl text-[15px] font-bold text-gray-700 shadow-sm">My Profile</Link>
                 <button onClick={handleSignOut} className="w-full text-center px-4 py-3 bg-red-50 text-red-600 rounded-xl text-[15px] font-bold">Sign Out</button>
               </div>
            ) : (
               <div className="flex flex-col gap-3">
                 <Link href="/auth/signin" onClick={() => setIsOpen(false)} className="w-full text-center px-4 py-3 bg-white border border-gray-200 rounded-xl text-[15px] font-bold text-gray-700 shadow-sm">Login</Link>
                 <Link href="/auth/signup" onClick={() => setIsOpen(false)} className="w-full text-center px-4 py-3 bg-sky-500 text-white rounded-xl text-[15px] font-bold shadow-md">Register</Link>
               </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
