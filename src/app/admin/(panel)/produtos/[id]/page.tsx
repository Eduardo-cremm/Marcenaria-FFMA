import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteItem, saveProduct } from "@/app/admin/actions";
import { DeleteButton, PhotoManager, SubmitButton } from "@/components/admin/client";
import { Check, Field, inputCls, Notice, PageTitle } from "@/components/admin/ui";
import { categories, type ProductRow } from "@/lib/data";
import { serverDb } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Produto" };

export default async function Produto({ params, searchParams }: { params: { id: string }; searchParams: { ok?: string; erro?: string } }) {
  const isNew = params.id === "novo";
  let p: ProductRow | null = null;
  let photos: { id: string; url: string }[] = [];
  if (!isNew) {
    const db = serverDb();
    const { data } = await db.from("products").select("*").eq("id", params.id).maybeSingle();
    if (!data) notFound();
    p = data as ProductRow;
    photos = (await db.from("product_photos").select("id, url").eq("product_id", params.id).order("display_order")).data ?? [];
  }

  return (
    <>
      <Link href="/admin/produtos" className="mb-3 inline-block text-sm font-semibold underline">← Produtos</Link>
      <PageTitle title={isNew ? "Novo produto" : p!.name} />
      <Notice params={searchParams} />

      <form action={saveProduct} className="grid gap-5 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2">
        <input type="hidden" name="id" value={p?.id ?? ""} />
        <Field label="Nome *" className="sm:col-span-2"><input name="name" required defaultValue={p?.name} className={inputCls} placeholder="Ex.: Mesa de Jantar Carvalho" /></Field>
        <Field label="Preço (R$) *"><input name="price" required inputMode="decimal" defaultValue={p ? String(Number(p.price)).replace(".", ",") : ""} className={inputCls} placeholder="3800,00" /></Field>
        <Field label="Categoria">
          <select name="category" defaultValue={p?.category ?? ""} className={inputCls}>
            <option value="">Selecione…</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Detalhe curto" hint="Aparece ao lado da categoria. Ex.: 6 lugares, 180 cm."><input name="detail" defaultValue={p?.detail ?? ""} className={inputCls} /></Field>
        <Field label="Prazo de produção"><input name="lead_time" defaultValue={p?.lead_time ?? ""} className={inputCls} placeholder="25 dias úteis" /></Field>
        <Field label="Acabamentos" hint="Separe por vírgula. O cliente escolhe um." className="sm:col-span-2"><input name="finishes" defaultValue={(p?.finishes ?? []).join(", ")} className={inputCls} placeholder="Natural, Escuro, Pintado" /></Field>
        <Field label="Descrição" className="sm:col-span-2"><textarea name="description" rows={5} defaultValue={p?.description ?? ""} className={inputCls} placeholder="Materiais, dimensões, o que acompanha…" /></Field>
        <Field label="Selo">
          <select name="badge" defaultValue={p?.badge ?? ""} className={inputCls}>
            <option value="">Nenhum</option><option>Destaque</option><option>Novo</option>
          </select>
        </Field>
        <Field label="Endereço da página (slug)" hint="Deixe vazio para gerar a partir do nome."><input name="slug" defaultValue={p?.slug ?? ""} className={inputCls} /></Field>
        <div className="flex flex-wrap gap-x-8 gap-y-3 sm:col-span-2">
          <Check name="is_available" label="Mostrar na loja" defaultChecked={p ? !!p.is_available : true} />
          <Check name="is_featured" label="Destaque na home" defaultChecked={!!p?.is_featured} />
          <Check name="in_stock" label="Pronta entrega" defaultChecked={!!p?.in_stock} />
        </div>
        <div className="sm:col-span-2"><SubmitButton>{isNew ? "Criar produto" : "Salvar alterações"}</SubmitButton></div>
      </form>

      {p && (
        <>
          <h2 className="mb-4 mt-10 font-serif text-2xl font-medium">Fotos</h2>
          <PhotoManager kind="products" parentId={p.id} photos={photos} />

          <form action={deleteItem} className="mt-12 border-t border-line pt-6">
            <input type="hidden" name="kind" value="products" />
            <input type="hidden" name="id" value={p.id} />
            <DeleteButton what={`o produto "${p.name}" e suas fotos`} />
          </form>
        </>
      )}
    </>
  );
}
