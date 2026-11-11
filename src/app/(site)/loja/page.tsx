import type { Metadata } from "next";
import Link from "next/link";
import { PageHead, ProductCard } from "@/components/Blocks";
import { categories, getProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Loja" };

const sorts = [
  { key: "", label: "Destaques" },
  { key: "menor", label: "Menor preço" },
  { key: "maior", label: "Maior preço" },
];

export default async function Loja({ searchParams }: { searchParams: { categoria?: string; ordem?: string } }) {
  const all = await getProducts();
  const cat = categories.find((c) => c === searchParams.categoria);
  const ordem = searchParams.ordem ?? "";
  const list = cat ? all.filter((p) => p.category === cat) : [...all];
  if (ordem === "menor") list.sort((a, b) => a.price - b.price);
  else if (ordem === "maior") list.sort((a, b) => b.price - a.price);
  else list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  const url = (c?: string, o?: string) => {
    const q = new URLSearchParams();
    if (c) q.set("categoria", c);
    if (o) q.set("ordem", o);
    const s = q.toString();
    return s ? `/loja?${s}` : "/loja";
  };

  return (
    <>
      <PageHead
        eyebrow="Loja"
        lines={[<>Peças <em>prontas</em></>]}
        text="Móveis do nosso catálogo, com escolha de acabamento. O pedido é fechado pelo WhatsApp."
      />
      <section className="sec light">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Link href={url(undefined, ordem)} scroll={false} className="chip" aria-current={!cat ? "true" : undefined}>Todos</Link>
            {categories.map((c) => (
              <Link key={c} href={url(c, ordem)} scroll={false} className="chip" aria-current={cat === c ? "true" : undefined}>{c}</Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 whitespace-nowrap text-sm">
            <span className="text-muted">{list.length} {list.length === 1 ? "produto" : "produtos"} ·</span>
            {sorts.map((s) => (
              <Link key={s.key} href={url(cat, s.key)} scroll={false} className={ordem === s.key ? "font-semibold underline" : "text-muted hover:text-ink"}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
        {list.length ? (
          <div className="shop !grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-4">
            {list.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        ) : (
          <p className="text-muted">Nenhum produto nesta categoria no momento.</p>
        )}
      </section>
    </>
  );
}
