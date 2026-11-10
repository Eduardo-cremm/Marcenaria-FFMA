"use client";

import Link from "next/link";
import { CartLines, CheckoutButton, useCart } from "@/components/Cart";
import { brl } from "@/lib/format";

export default function Carrinho() {
  const { total, count, clear } = useCart();
  return (
    <>
      <section className="page-head dark">
        <span className="eyebrow">Carrinho</span>
        <h1 className="serif">Seu pedido</h1>
        <p>Confira os itens e finalize pelo WhatsApp. Pagamento e entrega são combinados com a nossa equipe.</p>
      </section>
      <section className="sec light">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <CartLines />
            <div className="mt-6 flex justify-between text-sm font-semibold">
              <Link href="/loja" className="underline">Continuar comprando</Link>
              {count > 0 && <button type="button" className="text-muted underline" onClick={clear}>Esvaziar carrinho</button>}
            </div>
          </div>
          <aside className="h-fit rounded-xl bg-surface p-6">
            <div className="mb-5 flex items-baseline justify-between">
              <span className="text-sm text-muted">Total estimado ({count} {count === 1 ? "item" : "itens"})</span>
              <strong className="font-serif text-3xl font-medium">{brl(total)}</strong>
            </div>
            <CheckoutButton />
            <p className="mt-3 text-center text-xs text-muted">O valor final é confirmado no atendimento, com frete e instalação.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
