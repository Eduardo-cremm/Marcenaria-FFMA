"use client";

import { useEffect, useState } from "react";

type Phrase = { art: string; pos: string; noun: string };

const phrases: Phrase[] = [
  { art: "a", pos: "sua", noun: "casa" },
  { art: "a", pos: "sua", noun: "cozinha" },
  { art: "o", pos: "seu", noun: "escritório" },
  { art: "a", pos: "sua", noun: "sala" },
  { art: "a", pos: "sua", noun: "suíte" },
  { art: "a", pos: "sua", noun: "família" },
];

/**
 * Uma posição do título que troca de palavra, letra por letra.
 * Todas as opções ficam empilhadas na mesma célula, com a largura da maior: a linha nunca
 * muda de tamanho. Se a palavra não mudou entre duas frases (ex.: "a" → "a"), fica parada.
 */
function Slot({ words, i, prev, suffix = "" }: { words: string[]; i: number; prev: number | null; suffix?: string }) {
  const changed = prev !== null && words[prev] !== words[i];
  const letters = (w: string, cls: string) =>
    Array.from(w + suffix).map((ch, k) => (
      <span key={k} className={cls} style={{ animationDelay: `${k * 32}ms` }}>
        {ch}
      </span>
    ));
  return (
    <span aria-hidden="true" className="rot-box">
      {Array.from(new Set(words)).map((w) => <span key={w} className="rot-ghost">{w + suffix}</span>)}
      {changed && <span key={`o${prev}-${i}`}>{letters(words[prev!], "rot-out")}</span>}
      <span key={changed ? `n${i}` : `s${words[i]}`}>{letters(words[i], changed ? "rot-in" : "")}</span>
    </span>
  );
}

/**
 * Título da home: "Móveis feitos / para a sua / casa, / não para a vitrine."
 * Artigo, possessivo e cômodo trocam juntos (a sua casa → o seu escritório…), sempre nas mesmas linhas.
 * Leitores de tela ouvem só a primeira frase; quem pede menos movimento vê a primeira, parada.
 */
export function HeroTitle({ first = 2600, every = 2600 }: { first?: number; every?: number }) {
  const [{ i, prev }, setState] = useState<{ i: number; prev: number | null }>({ i: 0, prev: null });

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let iv: ReturnType<typeof setInterval>;
    const step = () => setState((s) => ({ i: (s.i + 1) % phrases.length, prev: s.i }));
    const t = setTimeout(() => { step(); iv = setInterval(step, every); }, first);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [first, every]);

  const p = phrases[0];
  return (
    <h1 className="serif">
      <span className="sr-only">Móveis feitos para {p.art} {p.pos} {p.noun}, não para a vitrine.</span>
      <span aria-hidden="true">
        <span className="ln"><span>Móveis feitos</span></span>
        <span className="ln">
          <span>
            para <Slot words={phrases.map((x) => x.art)} i={i} prev={prev} />{" "}
            <em><Slot words={phrases.map((x) => x.pos)} i={i} prev={prev} /></em>
          </span>
        </span>
        <span className="ln"><span><Slot words={phrases.map((x) => x.noun)} i={i} prev={prev} suffix="," /></span></span>
        <span className="ln"><span>não para a vitrine.</span></span>
      </span>
    </h1>
  );
}
