import type { Metadata } from "next";
import Link from "next/link";
import { deleteQuote, setQuoteStatus } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/client";
import { PageTitle } from "@/components/admin/ui";
import { serverDb } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Orçamentos" };

type Quote = { id: string; name: string; email: string | null; phone: string | null; city: string | null; subject: string | null; message: string | null; status: string; created_at: string };

// Link para responder no WhatsApp do cliente (assume DDI 55 quando ele informou só DDD + número).
function replyUrl(q: Quote) {
  const d = (q.phone ?? "").replace(/\D/g, "");
  if (d.length < 10) return null;
  return `https://wa.me/${d.length <= 11 ? "55" + d : d}?text=${encodeURIComponent(`Olá, ${q.name.split(" ")[0]}! Aqui é da Marcenaria FFMA. Recebemos sua mensagem pelo site.`)}`;
}

export default async function Orcamentos({ searchParams }: { searchParams: { ver?: string } }) {
  const onlyNew = searchParams.ver !== "todos";
  let query = serverDb().from("quotes").select("*").order("created_at", { ascending: false }).limit(200);
  if (onlyNew) query = query.eq("status", "novo");
  const rows = ((await query).data ?? []) as Quote[];

  return (
    <>
      <PageTitle title="Orçamentos" />
      <div className="mb-6 flex gap-2">
        <Link href="/admin/orcamentos" className="chip" aria-current={onlyNew ? "true" : undefined}>Sem resposta</Link>
        <Link href="/admin/orcamentos?ver=todos" className="chip" aria-current={!onlyNew ? "true" : undefined}>Todos</Link>
      </div>
      {rows.length ? (
        <ul className="flex flex-col gap-4">
          {rows.map((q) => {
            const reply = replyUrl(q);
            return (
              <li key={q.id} className={`rounded-xl bg-white p-5 shadow-sm ${q.status === "novo" ? "" : "opacity-70"}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <b className="font-semibold">{q.name}</b>
                    <span className="ml-2 rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-muted">{q.subject}</span>
                    <p className="mt-1 text-sm text-muted">{[q.phone, q.email, q.city].filter(Boolean).join(" · ")}</p>
                  </div>
                  <time className="text-xs text-muted">{new Date(q.created_at).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" })}</time>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-[15px]">{q.message}</p>
                <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-line pt-4">
                  {reply && <a href={reply} target="_blank" rel="noopener noreferrer" className="btn btn-whats btn-sm">Responder no WhatsApp</a>}
                  {q.email && <a href={`mailto:${q.email}`} className="text-sm font-semibold underline">Responder por e-mail</a>}
                  <form action={setQuoteStatus}>
                    <input type="hidden" name="id" value={q.id} />
                    <input type="hidden" name="status" value={q.status === "novo" ? "respondido" : "novo"} />
                    <button type="submit" className="text-sm font-semibold underline">{q.status === "novo" ? "Marcar como respondido" : "Reabrir"}</button>
                  </form>
                  <form action={deleteQuote} className="ml-auto">
                    <input type="hidden" name="id" value={q.id} />
                    <DeleteButton what={`o orçamento de ${q.name}`} />
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-xl bg-white px-5 py-8 text-center text-sm text-muted shadow-sm">{onlyNew ? "Nenhum orçamento aguardando resposta." : "Nenhum orçamento recebido ainda."}</p>
      )}
    </>
  );
}
