"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __fx?: boolean;
    __lenis?: Lenis;
  }
}

/** Rolagem suave (Lenis) ligada ao GSAP. Montado uma vez no layout. */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ anchors: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}

/**
 * Animações comuns a todas as páginas:
 *  .rl        título que entra linha por linha (cada linha em <span class="ln"><span>…</span></span>)
 *  [data-rv]  bloco que sobe e aparece
 *  [data-n]   número que conta até o valor
 * Fica depois de {children} no layout para rodar após as animações da própria página.
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    window.__fx = true;
    gsap.registerPlugin(ScrollTrigger);
    if (!document.documentElement.classList.contains("fx")) return;

    // Vindo pela cortina de transição: espera ela começar a subir para animar o topo da página.
    const delay = document.documentElement.classList.contains("pt") ? 0.45 : 0;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rl").forEach((el) => {
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(el.querySelectorAll(".ln > span"), {
          yPercent: 115, duration: 1.1, stagger: 0.1, ease: "expo.out", delay,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.fromTo(el, { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", delay, scrollTrigger: { trigger: el, start: "top 92%" } });
      });
      gsap.utils.toArray<HTMLElement>("[data-n]").forEach((el) => {
        const o = { v: 0 };
        gsap.to(o, {
          v: Number(el.dataset.n), duration: 1.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 94%" },
          onUpdate: () => { el.textContent = String(Math.round(o.v)); },
        });
      });
    });
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [pathname]);

  return null;
}
