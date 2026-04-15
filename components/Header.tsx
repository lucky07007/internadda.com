"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, User, CreditCard, ChevronDown, Search, Moon, Sun, Briefcase } from "lucide-react";
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
  { name: "Home", href: "/" },
  { name: "Internships", href: "/internships" },
  { name: "Courses", href: "/courses" },
  { name: "Journal", href: "/blog" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const handleSignOut = async () => { await signOut(); router.push("/"); };
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Future global search implementation here
      router.push(`/internships?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const userInitial = (user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "U").toUpperCase();
  const userName = user?.user_metadata?.full_name?.split(" ")[0] || "Account";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-300 top-0 font-sans ${
          scrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm"
            : "bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-6">

          {/* Logo Region */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="flex flex-col">
                 <span className="text-[24px] font-black tracking-tight text-gray-900 dark:text-white leading-none">
                   InternAdda
                 </span>
                 <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-[0.2em] mt-0.5">Powered by UpForge</span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
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

          <div className="hidden lg:flex flex-1 max-w-lg mx-4 relative group">
            <GlobalSearch />
          </div>

          {/* Right side Actions & Auth */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
             <Link href="/hire" className="hidden xl:flex items-center gap-2 px-4 py-2 text-[14px] font-bold text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                <Briefcase size={16} /> Hire Interns
             </Link>

             {mounted && (
               <button 
                 onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                 className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
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
              <div className="flex items-center gap-3 ml-2">
                <Link href="/auth/signin" className="text-[14px] font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-6 py-2.5 bg-sky-500 text-white text-[14px] font-bold rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/20 active:scale-95">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Adding a dynamic spacer based on header height so content doesn't jump, but no massive paddings */}
      <div className="h-[76px]" />
    </>
  );
}


