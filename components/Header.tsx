"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User, CreditCard, ChevronDown, Search, Moon, Sun, Briefcase, Home, BookOpen, Newspaper, GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearch } from "@/components/GlobalSearch";

const NAV_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Internships", href: "/internships", icon: Briefcase },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Journal", href: "/blog", icon: Newspaper },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [pathname, isOpen]);

  const handleSignOut = async () => { 
    await signOut(); 
    router.push("/"); 
    setIsOpen(false);
  };

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const userInitial = (user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase();
  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "Account";

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-300 top-0 font-sans ${
          scrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm"
            : "bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">

          {/* Logo Region */}
          <div className="flex items-center gap-6 lg:gap-10">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group" onClick={closeMobileMenu}>
              <div className="flex flex-col">
                 <span className="text-[22px] sm:text-[24px] font-black tracking-tight text-gray-900 dark:text-white leading-none">
                   InternAdda
                 </span>
                 <span className="text-[8px] sm:text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-[0.2em] mt-0.5">Powered by UpForge</span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[15px] font-bold transition-all relative py-2 ${
                      active ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-[-22px] left-0 w-full h-1 bg-sky-500 rounded-t-full shadow-[0_-2px_10px_rgba(14,165,233,0.5)]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-4">
            <GlobalSearch />
          </div>

          {/* Right side Actions & Auth */}
          <div className="hidden md:flex items-center gap-2 xl:gap-4 flex-shrink-0">
             <Link href="/hire" className="hidden xl:flex items-center gap-2 px-4 py-2 text-[14px] font-bold text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                <Briefcase size={16} /> Hire Interns
             </Link>

             {mounted && (
               <button 
                 onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                 aria-label="Toggle theme"
               >
                 {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
               </button>
             )}

            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all outline-none ml-2">
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
                      {userInitial}
                    </div>
                    <span className="text-[13px] font-bold text-gray-700 dark:text-gray-200 max-w-[80px] truncate">{userName}</span>
                    <ChevronDown size={14} className="text-gray-400 flex-shrink-0" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 mt-2 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-950 font-sans" align="end" sideOffset={8}>
                  <DropdownMenuLabel className="px-3 py-3 mb-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {userInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[15px] font-bold text-gray-900 dark:text-white truncate">{user?.user_metadata?.full_name || "Student"}</p>
                        <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800 mx-1 mb-2" />
                  <DropdownMenuItem onClick={() => router.push("/profile")} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors rounded-xl font-bold">
                    <User size={18} className="text-gray-400" /> <span className="text-[14px]">My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard")} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors rounded-xl font-bold">
                    <CreditCard size={18} className="text-gray-400" /> <span className="text-[14px]">My Enrollments / Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800 mx-1 my-2" />
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-colors rounded-xl font-bold">
                    <LogOut size={18} /> <span className="text-[14px]">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link href="/auth/signin" className="text-[14px] font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-5 py-2.5 bg-sky-500 text-white text-[14px] font-bold rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20 active:scale-95">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{ top: '76px', zIndex: 99 }}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu Panel */}
        <div 
          className={`fixed top-[76px] left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 ease-out md:hidden ${
            isOpen ? "max-h-[calc(100vh-76px)] opacity-100 visible" : "max-h-0 opacity-0 invisible"
          }`}
          style={{ zIndex: 100, overflowY: 'auto' }}
        >
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <GlobalSearch />
            </div>

            {/* Mobile Navigation Links */}
            <nav className="space-y-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
                      active 
                        ? "bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400" 
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                  >
                    <Icon size={20} />
                    {link.name}
                  </Link>
                );
              })}
              
              <Link
                href="/hire"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
              >
                <Briefcase size={20} />
                Hire Interns
              </Link>
            </nav>

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {userInitial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-bold text-gray-900 dark:text-white truncate">
                        {user?.user_metadata?.full_name || "Student"}
                      </p>
                      <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    {mounted && (
                      <button 
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                      >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        router.push("/profile");
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
                    >
                      <User size={18} />
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        closeMobileMenu();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
                    >
                      <CreditCard size={18} />
                      My Enrollments / Dashboard
                    </button>
                  </div>
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                  >
                    <LogOut size={18} />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {mounted && (
                    <div className="flex justify-end px-2">
                      <button 
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                      >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                      </button>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/auth/signin"
                      onClick={closeMobileMenu}
                      className="text-center py-3 px-4 text-[14px] font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-900 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={closeMobileMenu}
                      className="text-center py-3 px-4 text-[14px] font-bold text-white bg-sky-500 rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Header Spacer */}
      <div className="h-[76px]" />
    </>
  );
}
