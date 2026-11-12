"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Blade } from "./Logo";

/**
 * Cortina verde com a serra entre uma página e outra.
 * Intercepta cliques em links internos, cobre a tela, navega e descobre a página nova.
 * Filtros na mesma página (/loja?categoria=…), âncoras, links externos, nova aba e /admin passam direto.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const covered = useRef(false);
  const safety = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const el = curtain.current!;
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Posição inicial só pelo GSAP: um transform no CSS se somaria ao yPercent.
    gsap.set(el, { y: 0, yPercent: 100 });

    const onClick = (e: MouseEvent) => {
      if (reduce || covered.current || e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname.startsWith("/admin")) return;
      if (url.pathname === location.pathname) return; // filtro ou âncora na mesma página

      // Antes do onClick do <Link>: com o padrão cancelado, o Next não navega sozinho.
      e.preventDefault();
      covered.current = true;
      root.classList.add("pt");
      gsap.killTweensOf(el);
      gsap
        .timeline()
        .set(el, { visibility: "visible", yPercent: 100 })
        .to(el, { yPercent: 0, duration: 0.6, ease: "expo.inOut" })
        .fromTo(el.querySelector("svg"), { autoAlpha: 0, scale: 0.85, rotate: -40 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, ease: "power3.out" }, 0.3)
        .add(() => {
          router.push(url.pathname + url.search + url.hash);
          // Se a página demorar demais, descobre mesmo assim.
          safety.current = setTimeout(reveal, 6000);
        });
    };

    function reveal() {
      if (!covered.current) return;
      covered.current = false;
      clearTimeout(safety.current);
      window.__lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      gsap
        .timeline({ delay: 0.12 })
        .to(el.querySelector("svg"), { autoAlpha: 0, scale: 0.9, duration: 0.25, ease: "power2.in" })
        .to(el, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, 0.1)
        .add(() => {
          gsap.set(el, { visibility: "hidden", yPercent: 100 });
          root.classList.remove("pt");
        });
    }

    (window as Window & { __ptReveal?: () => void }).__ptReveal = reveal;
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Página nova montada: espera dois quadros para o layout assentar e levanta a cortina.
  useEffect(() => {
    if (!covered.current) return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => (window as Window & { __ptReveal?: () => void }).__ptReveal?.());
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [pathname]);

  return (
    <div ref={curtain} className="pt-curtain" aria-hidden="true">
      <Blade width={96} />
    </div>
  );
}
