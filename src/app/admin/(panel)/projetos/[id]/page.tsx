import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteItem, saveProject } from "@/app/admin/actions";
import { DeleteButton, PhotoManager, SubmitButton } from "@/components/admin/client";
import { Check, Field, inputCls, Notice, PageTitle } from "@/components/admin/ui";
import { rooms, type ProjectRow } from "@/lib/data";
import { serverDb } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Projeto" };

export default async function Projeto({ params, searchParams }: { params: { id: string }; searchParams: { ok?: string; erro?: string } }) {
  const isNew = params.id === "novo";
  let p: ProjectRow | null = null;
  let photos: { id: string; url: string }[] = [];
  if (!isNew) {
    const db = serverDb();
    const { data } = await db.from("projects").select("*").eq("id", params.id).maybeSingle();
    if (!data) notFound();
    p = data as ProjectRow;
    photos = (await db.from("project_photos").select("id, url").eq("project_id", params.id).order("display_order")).data ?? [];
  }

  return (
    <>
      <Link href="/admin/projetos" className="mb-3 inline-block text-sm font-semibold underline">← Projetos</Link>
      <PageTitle title={isNew ? "Novo projeto" : p!.title} />
      <Notice params={searchParams} />

      <form action={saveProject} className="grid gap-5 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2">
        <input type="hidden" name="id" value={p?.id ?? ""} />
        <Field label="Nome do projeto *" className="sm:col-span-2"><input name="title" required defaultValue={p?.title} className={inputCls} placeholder="Ex.: Cozinha planejada em Higienópolis" /></Field>
        <Field label="Cômodo">
          <select name="room" defaultValue={p?.room ?? ""} className={inputCls}>
            <option value="">Selecione…</option>
            {rooms.map((r) => <option key={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Cidade ou bairro"><input name="city" defaultValue={p?.city ?? ""} className={inputCls} /></Field>
        <Field label="Concluído em"><input name="completed_at" type="date" defaultValue={p?.completed_at ?? ""} className={inputCls} /></Field>
        <Field label="Material principal"><input name="material" defaultValue={p?.material ?? ""} className={inputCls} placeholder="Freijó e MDF" /></Field>
        <Field label="Prazo de execução"><input name="lead_time" defaultValue={p?.lead_time ?? ""} className={inputCls} placeholder="45 dias úteis" /></Field>
        <Field label="Endereço da página (slug)" hint="Deixe vazio para gerar a partir do nome."><input name="slug" defaultValue={p?.slug ?? ""} className={inputCls} /></Field>
        <Field label="Descrição" className="sm:col-span-2"><textarea name="description" rows={5} defaultValue={p?.description ?? ""} className={inputCls} /></Field>
        <div className="flex flex-wrap gap-x-8 gap-y-3 sm:col-span-2">
          <Check name="is_published" label="Publicado no site" defaultChecked={!!p?.is_published} />
          <Check name="is_featured" label="Destaque na home" defaultChecked={!!p?.is_featured} />
        </div>
        <div className="sm:col-span-2"><SubmitButton>{isNew ? "Criar projeto" : "Salvar alterações"}</SubmitButton></div>
      </form>

      {p && (
        <>
          <h2 className="mb-4 mt-10 font-serif text-2xl font-medium">Fotos</h2>
          <PhotoManager kind="projects" parentId={p.id} photos={photos} />

          <form action={deleteItem} className="mt-12 border-t border-line pt-6">
            <input type="hidden" name="kind" value="projects" />
            <input type="hidden" name="id" value={p.id} />
            <DeleteButton what={`o projeto "${p.title}" e suas fotos`} />
          </form>
        </>
      )}
    </>
  );
}
