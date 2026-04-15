  "use client";

  import { useState, useRef, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import { Search, BookOpen, Briefcase, FileText, ChevronRight } from "lucide-react";

  // Mock data spanning the 3 domains
  const MOCK_SUGGESTIONS = {
    internships: [
      { title: "Marketing Strategy Intern", type: "internship", url: "/internships?search=marketing" },
      { title: "Software Engineering Intern", type: "internship", url: "/internships?search=software" },
      { title: "Data Science Remote Intern", type: "internship", url: "/internships?search=data" },
    ],
    courses: [
      { title: "Advanced Digital Marketing", type: "course", url: "/courses" },
      { title: "Full Stack Web Development", type: "course", url: "/courses" },
    ],
    blogs: [
      { title: "How to ace your Marketing Interview", type: "blog", url: "/blog" },
      { title: "Top 10 Remote Internship Tips", type: "blog", url: "/blog" },
    ],
  };

  export function GlobalSearch() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Simple hard filter
    const filterResults = (items: any[]) => items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    
    const results = {
      internships: filterResults(MOCK_SUGGESTIONS.internships),
      courses: filterResults(MOCK_SUGGESTIONS.courses),
      blogs: filterResults(MOCK_SUGGESTIONS.blogs),
    };

    const hasResults = results.internships.length > 0 || results.courses.length > 0 || results.blogs.length > 0;

    const handleSelect = (url: string) => {
      setIsOpen(false);
      setQuery("");
      router.push(url);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        setIsOpen(false);
        router.push(`/internships?search=${encodeURIComponent(query.trim())}`);
      }
    };

    return (
      <div className="w-full relative" ref={wrapperRef}>
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search internships, courses, journals..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-[14px] font-medium focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
          />
        </form>

        {isOpen && query && (
          <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-[110]">
            {!hasResults ? (
              <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No direct matches found. Press Enter to search all.
              </div>
            ) : (
              <div className="max-h-[70vh] overflow-y-auto">
                {results.internships.length > 0 && (
                  <div className="p-2 border-b border-gray-100 dark:border-gray-900">
                    <h4 className="flex items-center gap-2 px-2 py-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      <Briefcase size={12} /> Internships
                    </h4>
                    {results.internships.map((res, i) => (
                      <button key={i} onClick={() => handleSelect(res.url)} className="w-full text-left flex items-center justify-between px-2 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors group">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">{res.title}</span>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-emerald-500" />
                      </button>
                    ))}
                  </div>
                )}
                
                {results.courses.length > 0 && (
                  <div className="p-2 border-b border-gray-100 dark:border-gray-900">
                    <h4 className="flex items-center gap-2 px-2 py-1.5 text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      <BookOpen size={12} /> Courses
                    </h4>
                    {results.courses.map((res, i) => (
                      <button key={i} onClick={() => handleSelect(res.url)} className="w-full text-left flex items-center justify-between px-2 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors group">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">{res.title}</span>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500" />
                      </button>
                    ))}
                  </div>
                )}

                {results.blogs.length > 0 && (
                  <div className="p-2">
                    <h4 className="flex items-center gap-2 px-2 py-1.5 text-[11px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
                      <FileText size={12} /> Journals
                    </h4>
                    {results.blogs.map((res, i) => (
                      <button key={i} onClick={() => handleSelect(res.url)} className="w-full text-left flex items-center justify-between px-2 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-xl transition-colors group">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-300">{res.title}</span>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-purple-500" />
                      </button>
                    ))}
                  </div>
                )}
                
                <button 
                  onClick={() => handleSelect(`/internships?search=${encodeURIComponent(query)}`)} 
                  className="w-full p-3 bg-gray-50 dark:bg-gray-900 text-center text-[12px] font-bold text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 border-t border-gray-200 dark:border-gray-800 transition-colors"
                >
                  View all results for "{query}"
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
