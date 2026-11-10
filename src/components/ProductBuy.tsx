"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { AddToCart } from "./Cart";
import { useWhats } from "./SiteContext";

export function ProductBuy({ p }: { p: Product }) {
  const [finish, setFinish] = useState<string | undefined>(p.finishes[0]);
  const whats = useWhats();
  return (
    <>
      {p.finishes.length > 0 && <span className="mb-2 mt-8 block text-[13px] font-semibold">Acabamento</span>}
      <div className="flex flex-wrap gap-2">
        {p.finishes.map((f) => (
          <button key={f} type="button" className="chip" aria-pressed={finish === f} onClick={() => setFinish(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <AddToCart className="btn btn-dark flex-1" item={{ id: p.id, slug: p.slug, name: p.name, price: p.price, finish, tone: p.tone }}>
          Adicionar ao carrinho
        </AddToCart>
        <a
          className="btn btn-whats flex-1"
          target="_blank"
          rel="noopener noreferrer"
          href={whats(`Olá! Tenho interesse em: ${p.name}${finish ? ` (acabamento ${finish})` : ""}.`)}
        >
          Pedir pelo WhatsApp
        </a>
      </div>
    </>
  );
}
