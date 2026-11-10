"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { brl, orderMessage, type CartLine } from "@/lib/format";
import { useWhats } from "./SiteContext";

type CartCtx = {
  items: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartLine, "qty">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "ffma-cart";
export const lineKey = (i: Pick<CartLine, "id" | "finish">) => `${i.id}::${i.finish ?? ""}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const add = useCallback((item: Omit<CartLine, "qty">) => {
    setItems((prev) => {
      const k = lineKey(item);
      return prev.some((i) => lineKey(i) === k)
        ? prev.map((i) => (lineKey(i) === k ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  }, []);
  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => (qty < 1 ? prev.filter((i) => lineKey(i) !== key) : prev.map((i) => (lineKey(i) === key ? { ...i, qty } : i))));
  }, []);
  const remove = useCallback((key: string) => setItems((prev) => prev.filter((i) => lineKey(i) !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    }),
    [items, open, add, setQty, remove, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart fora do CartProvider");
  return c;
}

export function AddToCart({ item, className = "add", children = "Adicionar" }: { item: Omit<CartLine, "qty">; className?: string; children?: React.ReactNode }) {
  const { add } = useCart();
  return (
    <button type="button" className={className} onClick={() => add(item)}>
      {children}
    </button>
  );
}

export function CartLines() {
  const { items, setQty, remove } = useCart();
  if (!items.length) return <p className="py-10 text-center text-muted">Seu carrinho está vazio.</p>;
  return (
    <ul className="divide-y divide-line">
      {items.map((i) => {
        const k = lineKey(i);
        return (
          <li key={k} className="flex gap-4 py-4">
            <div className={`ph ph-${i.tone ?? "a"} h-16 w-16 shrink-0 rounded-lg`} />
            <div className="min-w-0 flex-1">
              <Link href={`/loja/${i.slug}`} className="block truncate text-[15px] font-semibold">
                {i.name}
              </Link>
              {i.finish && <span className="text-[13px] text-muted">Acabamento: {i.finish}</span>}
              <div className="mt-2 flex items-center gap-2">
                <button type="button" aria-label="Diminuir" className="grid h-7 w-7 place-items-center rounded-md border border-line" onClick={() => setQty(k, i.qty - 1)}>
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold tabular-nums">{i.qty}</span>
                <button type="button" aria-label="Aumentar" className="grid h-7 w-7 place-items-center rounded-md border border-line" onClick={() => setQty(k, i.qty + 1)}>
                  +
                </button>
                <button type="button" className="ml-2 text-[13px] text-muted underline" onClick={() => remove(k)}>
                  Remover
                </button>
              </div>
            </div>
            <span className="font-serif text-lg">{brl(i.price * i.qty)}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function CheckoutButton({ className = "btn btn-whats w-full" }: { className?: string }) {
  const { items } = useCart();
  const whats = useWhats();
  return (
    <a
      className={className}
      href={items.length ? whats(orderMessage(items)) : undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={!items.length}
      style={items.length ? undefined : { opacity: 0.5, pointerEvents: "none" }}
    >
      Finalizar pedido pelo WhatsApp
    </a>
  );
}

export function CartDrawer() {
  const { open, setOpen, count, total } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-black/45 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-label="Carrinho"
        aria-hidden={!open}
        data-lenis-prevent
        className={`fixed inset-y-0 right-0 z-[100] flex w-[420px] max-w-full flex-col bg-cream text-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-2xl">Carrinho ({count})</h2>
          <button type="button" aria-label="Fechar" className="grid h-9 w-9 place-items-center rounded-full border border-line" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          <CartLines />
        </div>
        <div className="border-t border-line px-6 py-5">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-sm text-muted">Total estimado</span>
            <strong className="font-serif text-3xl font-medium">{brl(total)}</strong>
          </div>
          <CheckoutButton />
          <Link href="/carrinho" className="mt-3 block text-center text-sm font-semibold underline" onClick={() => setOpen(false)}>
            Ver carrinho completo
          </Link>
          <p className="mt-3 text-center text-xs text-muted">Você confirma o pedido e combina pagamento e entrega pelo WhatsApp.</p>
        </div>
      </aside>
    </>
  );
}
