"use client";

import { useEffect, useState } from "react";

/**
 * Palavra do título que se troca sozinha, letra por letra.
 * Leitores de tela ouvem só a primeira palavra; quem pede menos movimento vê a primeira, parada.
 */
export function RotatingWord({ words, first = 2600, every = 2400 }: { words: string[]; first?: number; every?: number }) {
  const [{ i, prev }, setState] = useState<{ i: number; prev: number | null }>({ i: 0, prev: null });

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let iv: ReturnType<typeof setInterval>;
    const step = () => setState((s) => ({ i: (s.i + 1) % words.length, prev: s.i }));
    const t = setTimeout(() => { step(); iv = setInterval(step, every); }, first);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [words.length, first, every]);

  const letters = (w: string, cls: string) =>
    Array.from(w).map((ch, k) => (
      <span key={k} className={cls} style={{ animationDelay: `${k * 32}ms` }}>
        {ch}
      </span>
    ));

  return (
    <span className="rot">
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true" className="rot-box">
        {prev !== null && <span key={`o${prev}-${i}`} className="rot-old">{letters(words[prev], "rot-out")}</span>}
        <span key={`n${i}`} className="rot-new">{letters(words[i], prev === null ? "" : "rot-in")}</span>
      </span>
    </span>
  );
}
