import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Notice, PageTitle, Toggle } from "@/components/admin/ui";
import type { ProductRow } from "@/lib/data";
import { brl } from "@/lib/format";
import { serverDb } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Produtos" };

export default async function Produtos({ searchParams }: { searchParams: { ok?: string; erro?: string } }) {
  const { data, error } = await serverDb().from("products").select("*, product_photos(url, display_order)").order("created_at", { ascending: false });
  const rows = (data ?? []) as ProductRow[];

  return (
    <>
      <PageTitle title="Produtos" action={{ href: "/admin/produtos/novo", label: "+ Novo produto" }} />
      <Notice params={error ? { erro: error.message } : searchParams} />
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-surface text-left text-[11px] uppercase tracking-wider text-muted">
            <tr><th className="px-4 py-3">Produto</th><th className="px-4 py-3">Categoria</th><th className="px-4 py-3">Preço</th><th className="px-4 py-3">Na loja</th><th className="px-4 py-3">Destaque</th><th className="px-4 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((p) => {
              const cover = [...(p.product_photos ?? [])].sort((a, b) => a.display_order - b.display_order)[0]?.url;
              return (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <Link href={`/admin/produtos/${p.id}`} className="flex items-center gap-3">
                      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-surface">
                        {cover && <Image src={cover} alt="" fill sizes="44px" className="object-cover" />}
                      </span>
                      <span><b className="block font-semibold">{p.name}</b><span className="text-xs text-muted">{cover ? `${p.product_photos!.length} foto(s)` : "sem foto"}</span></span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">{brl(Number(p.price))}</td>
                  <td className="px-4 py-3"><Toggle kind="products" id={p.id} field="is_available" on={!!p.is_available} label="Mostrar na loja" /></td>
                  <td className="px-4 py-3"><Toggle kind="products" id={p.id} field="is_featured" on={!!p.is_featured} label="Destaque na home" /></td>
                  <td className="px-4 py-3 text-right"><Link href={`/admin/produtos/${p.id}`} className="font-semibold underline">Editar</Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!rows.length && <p className="px-5 py-8 text-center text-sm text-muted">Nenhum produto cadastrado. Enquanto a loja estiver vazia no banco, ela aparece vazia no site.</p>}
      </div>
    </>
  );
}
