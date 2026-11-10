import Link from "next/link";
import { PageTitle } from "@/components/admin/ui";
import { serverDb } from "@/lib/supabase/server";

type Quote = { id: string; name: string; subject: string | null; status: string; created_at: string };

export default async function Resumo() {
  const db = serverDb();
  const count = async (table: string, col?: string, val?: string | boolean) => {
    let q = db.from(table).select("*", { count: "exact", head: true });
    if (col) q = q.eq(col, val as string);
    return (await q).count ?? 0;
  };
  const [produtos, ocultos, projetos, rascunhos, novos, total] = await Promise.all([
    count("products", "is_available", true),
    count("products", "is_available", false),
    count("projects", "is_published", true),
    count("projects", "is_published", false),
    count("quotes", "status", "novo"),
    count("quotes"),
  ]);
  const { data: recent } = await db.from("quotes").select("id, name, subject, status, created_at").order("created_at", { ascending: false }).limit(5);

  const cards = [
    { label: "Produtos na loja", value: produtos, sub: `${ocultos} oculto(s)`, href: "/admin/produtos" },
    { label: "Projetos publicados", value: projetos, sub: `${rascunhos} rascunho(s)`, href: "/admin/projetos" },
    { label: "Orçamentos sem resposta", value: novos, sub: `${total} no total`, href: "/admin/orcamentos" },
  ];

  return (
    <>
      <PageTitle title="Resumo" />
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
            <strong className="block font-serif text-5xl font-medium tabular-nums">{c.value}</strong>
            <span className="mt-2 block text-sm font-semibold">{c.label}</span>
            <span className="text-xs text-muted">{c.sub}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/produtos/novo" className="rounded-xl border border-line bg-surface p-5 font-semibold transition hover:border-brass">+ Novo produto<span className="block text-sm font-normal text-muted">Cadastrar um item na loja</span></Link>
        <Link href="/admin/projetos/novo" className="rounded-xl border border-line bg-surface p-5 font-semibold transition hover:border-brass">+ Novo projeto<span className="block text-sm font-normal text-muted">Publicar no portfólio</span></Link>
      </div>

      <h2 className="mb-3 mt-10 font-serif text-2xl font-medium">Últimos orçamentos</h2>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {(recent as Quote[] | null)?.length ? (
          <ul className="divide-y divide-line">
            {(recent as Quote[]).map((q) => (
              <li key={q.id} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                <span><b className="font-semibold">{q.name}</b> <span className="text-muted">· {q.subject}</span></span>
                <span className="flex items-center gap-3 whitespace-nowrap text-muted">
                  {q.status === "novo" && <span className="rounded-full bg-brass/20 px-2 py-0.5 text-xs font-bold text-brass-dk">Novo</span>}
                  {new Date(q.created_at).toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-6 text-sm text-muted">Nenhum orçamento recebido ainda.</p>
        )}
      </div>
    </>
  );
}
