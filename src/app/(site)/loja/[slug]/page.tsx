import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/Blocks";
import { Photo } from "@/components/Photo";
import { ProductBuy } from "@/components/ProductBuy";
import { getProduct, getProducts, paymentMethods } from "@/lib/data";
import { brl } from "@/lib/format";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct(params.slug);
  return { title: p?.name ?? "Produto", description: p?.description };
}

export default async function Produto({ params }: Props) {
  const p = await getProduct(params.slug);
  if (!p) notFound();
  const extra = (p.images ?? []).slice(4);
  const related = (await getProducts()).filter((o) => o.category === p.category && o.id !== p.id).slice(0, 4);

  return (
    <>
      <div className="dark h-[76px]" />
      <section className="sec light !pt-12">
        <nav className="mb-8 text-sm text-muted" aria-label="Caminho">
          <Link href="/loja" className="underline">Loja</Link> / <Link href={`/loja?categoria=${encodeURIComponent(p.category)}`} className="underline">{p.category}</Link> / {p.name}
        </nav>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-3 gap-3" data-rv>
            <Photo tone={p.tone} src={p.images?.[0]} label="Foto principal" alt={p.name} className="col-span-3 aspect-[4/3] rounded-[10px]" />
            <Photo tone="c" src={p.images?.[1]} label="Foto" className="aspect-square rounded-[10px]" />
            <Photo tone="b" src={p.images?.[2]} label="Foto" className="aspect-square rounded-[10px]" />
            <Photo tone="f" src={p.images?.[3]} label="Foto" className="aspect-square rounded-[10px]" />
            {extra.map((src) => <Photo key={src} src={src} className="aspect-square rounded-[10px]" />)}
          </div>
          <div data-rv>
            <span className="eyebrow">{p.category} · {p.detail}</span>
            <h1 className="serif mt-3 text-[clamp(34px,4vw,54px)] leading-[1.05]">{p.name}</h1>
            <p className="mt-4 font-serif text-4xl">{brl(p.price)}</p>
            <p className="mt-5 text-lg text-muted">{p.description}</p>
            <ProductBuy p={p} />
            <dl className="mt-10 divide-y divide-line border-y border-line text-[15px]">
              <div className="flex justify-between py-3"><dt className="text-muted">Disponibilidade</dt><dd className="font-semibold">{p.inStock ? "Pronta entrega" : "Sob encomenda"}</dd></div>
              <div className="flex justify-between py-3"><dt className="text-muted">Prazo de produção</dt><dd className="font-semibold">{p.leadTime}</dd></div>
              <div className="flex justify-between py-3"><dt className="text-muted">Pagamento</dt><dd className="font-semibold">{paymentMethods.join(", ")}</dd></div>
            </dl>
          </div>
        </div>

        {related.length > 0 && (
          <>
            <h2 className="serif mb-8 mt-24 !text-4xl">Da mesma categoria</h2>
            <div className="shop !grid-cols-2 lg:!grid-cols-4">
              {related.map((r) => <ProductCard key={r.id} p={r} />)}
            </div>
          </>
        )}
      </section>
    </>
  );
}
