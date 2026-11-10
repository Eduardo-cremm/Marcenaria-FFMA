import { site } from "./site";

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: v % 1 ? 2 : 0 });

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const whatsUrl = (message: string, number: string = site.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export type CartLine = { id: string; slug: string; name: string; price: number; qty: number; finish?: string; tone?: string };

export function orderMessage(items: CartLine[]) {
  const lines = items.map(
    (i) => `• ${i.name}${i.finish ? ` (${i.finish})` : ""} × ${i.qty}: ${brl(i.price * i.qty)}`
  );
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  return ["Olá! Gostaria de fazer o seguinte pedido:", "", ...lines, "", `Total: ${brl(total)}`, "", "Aguardo confirmação!"].join("\n");
}
