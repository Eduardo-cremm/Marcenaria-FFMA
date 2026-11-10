import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Notice, PageTitle, Toggle } from "@/components/admin/ui";
import type { ProjectRow } from "@/lib/data";
import { serverDb } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Projetos" };

export default async function Projetos({ searchParams }: { searchParams: { ok?: string; erro?: string } }) {
  const { data, error } = await serverDb().from("projects").select("*, project_photos(url, display_order)").order("completed_at", { ascending: false, nullsFirst: true });
  const rows = (data ?? []) as ProjectRow[];

  return (
    <>
      <PageTitle title="Projetos" action={{ href: "/admin/projetos/novo", label: "+ Novo projeto" }} />
      <Notice params={error ? { erro: error.message } : searchParams} />
      {rows.length ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((p) => {
            const photos = [...(p.project_photos ?? [])].sort((a, b) => a.display_order - b.display_order);
            return (
              <li key={p.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <Link href={`/admin/projetos/${p.id}`} className="relative block aspect-[4/3] bg-surface">
                  {photos[0] ? <Image src={photos[0].url} alt="" fill sizes="320px" className="object-cover" /> : <span className="absolute inset-0 grid place-items-center text-sm text-muted">sem foto</span>}
                  {p.room && <span className="absolute left-2 top-2 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-bold text-white">{p.room}</span>}
                </Link>
                <div className="p-4">
                  <Link href={`/admin/projetos/${p.id}`} className="block font-semibold">{p.title}</Link>
                  <span className="text-xs text-muted">{[p.city, `${photos.length} foto(s)`].filter(Boolean).join(" · ")}</span>
                  <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs font-semibold">
                    <span className="flex items-center gap-2"><Toggle kind="projects" id={p.id} field="is_published" on={!!p.is_published} label="Publicado" />Publicado</span>
                    <span className="flex items-center gap-2"><Toggle kind="projects" id={p.id} field="is_featured" on={!!p.is_featured} label="Destaque na home" />Home</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-xl bg-white px-5 py-8 text-center text-sm text-muted shadow-sm">Nenhum projeto cadastrado ainda.</p>
      )}
    </>
  );
}
