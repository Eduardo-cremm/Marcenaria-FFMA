"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/** Animações exclusivas da home: abertura, hero em tela cheia, galeria horizontal e passos presos ao scroll. */
export function HomeMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s)!;
    const $$ = <T extends HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));

    const mm = gsap.matchMedia();
    mm.add(
      {
        desk: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        mob: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const desk = !!ctx.conditions?.desk;
        root.classList.add("anim");
        root.classList.toggle("desk", desk);
        const cleanups: Array<() => void> = [];

        // 1. abertura (só na primeira visita da sessão) + entrada do hero
        const hasIntro = root.classList.contains("pre");
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        if (hasIntro) {
          intro
            .to(".intro svg", { scale: 0.9, autoAlpha: 0, duration: 0.5, ease: "power2.in", delay: 0.5 })
            .to(".intro", { yPercent: -100, duration: 0.9, ease: "expo.inOut", onComplete: () => root.classList.remove("pre") }, "-=.1");
        }
        intro
          .set(".hero h1", { autoAlpha: 1 }, hasIntro ? "-=.5" : 0)
          .from(".hero h1 .ln > span", { yPercent: 115, duration: 1.2, stagger: 0.1 }, "<")
          .from(".hero .hi", { y: 28, autoAlpha: 0, duration: 1, stagger: 0.08 }, "<.25")
          .from(".hero-media", { autoAlpha: 0, yPercent: 6, duration: 1.3 }, "<");

        // 2. hero: a foto abre em tela cheia e a próxima seção cobre por cima
        if (desk) {
          gsap
            .timeline({ scrollTrigger: { trigger: ".hero-wrap", start: "top top", end: () => "+=" + innerHeight * 1.2, scrub: true } })
            .to(".hero-media", { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
            .fromTo(".hero-media .ph", { scale: 1.25 }, { scale: 1, ease: "none" }, 0)
            .to(".hero-copy", { yPercent: -22, autoAlpha: 0, ease: "none", duration: 0.4 }, 0)
            .to(".scroll-hint", { autoAlpha: 0, duration: 0.15 }, 0)
            .to(".hero-shade", { opacity: 0.5, ease: "none", duration: 0.45 }, 0.45)
            .fromTo(".hero-caption", { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.4 }, 0.55);
          gsap.to(".hero", {
            scale: 0.93, filter: "brightness(.7)", borderRadius: 28, ease: "none",
            scrollTrigger: { trigger: ".svc-sec", start: "top bottom", end: "top top", scrub: true },
          });
        } else {
          gsap.to(".hero-media .ph", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero-media", start: "top bottom", end: "bottom top", scrub: true } });
        }

        // 3. serviços: linhas em sequência + foto que segue o cursor
        gsap.from(".svc a", { y: 50, autoAlpha: 0, duration: 0.9, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: ".svc", start: "top 82%" } });
        if (desk) {
          const peek = $(".peek"), svc = $(".svc");
          gsap.set(peek, { xPercent: -50, yPercent: -55, scale: 0.8 });
          const px = gsap.quickTo(peek, "x", { duration: 0.5, ease: "power3" });
          const py = gsap.quickTo(peek, "y", { duration: 0.5, ease: "power3" });
          const move = (e: MouseEvent) => { px(e.clientX + 170); py(e.clientY); };
          const enter = (e: Event) => {
            const a = (e.target as HTMLElement).closest<HTMLElement>("a[data-ph]");
            if (!a) return;
            peek.className = "peek ph " + a.dataset.ph;
            gsap.to(peek, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
          };
          const leave = () => gsap.to(peek, { autoAlpha: 0, scale: 0.8, duration: 0.3 });
          svc.addEventListener("mousemove", move);
          svc.addEventListener("mouseover", enter);
          svc.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            svc.removeEventListener("mousemove", move);
            svc.removeEventListener("mouseover", enter);
            svc.removeEventListener("mouseleave", leave);
          });
        }

        // 4. projetos: galeria horizontal presa ao scroll
        if (desk) {
          const track = $(".track"), n = $$(".track figure").length, bar = $("#galBar"), num = $("#galN");
          const dist = () => track.scrollWidth - innerWidth;
          gsap.to(track, {
            x: () => -dist(), ease: "none",
            scrollTrigger: {
              trigger: ".gal", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.6, invalidateOnRefresh: true,
              onUpdate(self) {
                bar.style.transform = `scaleX(${self.progress})`;
                num.textContent = String(Math.min(n, 1 + Math.floor(self.progress * n))).padStart(2, "0") + " / " + String(n).padStart(2, "0");
              },
            },
          });
        } else {
          gsap.from(".track figure", { x: 60, autoAlpha: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".track", start: "top 85%" } });
        }

        // 5. processo: os passos avançam com o scroll
        const lis = $$(".proc-pin .steps li");
        if (desk) {
          const big = $("#bigN"), fill = $(".proc-pin .fill");
          let cur = 0;
          const setStep = (i: number) => {
            lis.forEach((li, k) => { li.classList.toggle("on", k === i); li.classList.toggle("done", k < i); });
            if (i !== cur) {
              cur = i;
              big.textContent = String(i + 1).padStart(2, "0");
              gsap.fromTo(big, { yPercent: 50, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" });
            }
          };
          setStep(0);
          ScrollTrigger.create({
            trigger: ".proc-pin", start: "top top", end: "+=220%", pin: true, scrub: true,
            onUpdate(self) {
              setStep(Math.min(lis.length - 1, Math.floor(self.progress * lis.length)));
              fill.style.transform = `scaleY(${self.progress})`;
            },
          });
          cleanups.push(() => { fill.style.transform = ""; lis.forEach((li) => li.classList.remove("on", "done")); });
        } else {
          gsap.from(lis, { x: 30, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".steps", start: "top 85%" } });
        }

        // 6. loja: fotos se revelam de baixo para cima
        gsap
          .timeline({ scrollTrigger: { trigger: ".shop", start: "top 80%" } })
          .from(".shop .card .ph", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, stagger: 0.12, ease: "expo.out" })
          .from(".shop .card .info", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }, 0.3);

        // 7. chamada final: letreiro corre com o scroll
        gsap.to(".mq-in", { xPercent: -35, ease: "none", scrollTrigger: { trigger: ".cta-sec", start: "top bottom", end: "bottom top", scrub: true } });

        return () => {
          cleanups.forEach((fn) => fn());
          root.classList.remove("anim", "desk", "pre");
        };
      }
    );

    return () => mm.revert();
  }, []);

  return null;
}
