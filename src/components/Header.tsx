"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { useCart } from "./Cart";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [solid, setSolid] = useState(false);
  const [up, setUp] = useState(false);
  const [menu, setMenu] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      setSolid(y > 40);
      setUp(y > last.current && y > 300);
      last.current = y;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className={`hd ${solid || menu ? "solid" : ""} ${up && !menu ? "up" : ""}`}>
      <div className="nav">
        <Logo />
        <nav className="links" aria-label="Principal">
          {site.nav.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname.startsWith(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <button type="button" className="icon-btn" aria-label={`Carrinho, ${count} itens`} onClick={() => setOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 4h2.2l2.3 10.5h9.8L19.5 7H6.2" />
              <circle cx="9" cy="19" r="1.4" />
              <circle cx="16.5" cy="19" r="1.4" />
            </svg>
            {count > 0 && <span className="n">{count}</span>}
          </button>
          <Link href="/contato" className="btn btn-brass btn-sm">
            Pedir orçamento
          </Link>
          <button type="button" className="icon-btn menu-btn" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav className={`mnav ${menu ? "open" : ""}`} aria-label="Menu">
        {site.nav.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link href="/contato" className="btn btn-brass mt-5 !border-0">
          Pedir orçamento
        </Link>
      </nav>
    </header>
  );
}
