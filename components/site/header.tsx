"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-sm tracking-widest text-white uppercase hover:opacity-70 transition-opacity"
        >
          PANchenko
        </Link>
        
        <nav className="flex items-center gap-8">
          {!isHome && (
            <Link 
              href="/" 
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Work
            </Link>
          )}
          <Link 
            href="/contact" 
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
