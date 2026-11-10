import type { Metadata } from "next";
import Link from "next/link";
import { CtaFinal, PageHead, ProjectCard } from "@/components/Blocks";
import { getProjects, rooms } from "@/lib/data";

export const metadata: Metadata = { title: "Projetos" };

export default async function Projetos({ searchParams }: { searchParams: { comodo?: string } }) {
  const all = await getProjects();
  const room = rooms.find((r) => r === searchParams.comodo);
  const list = room ? all.filter((p) => p.room === room) : all;

  return (
    <>
      <PageHead
        eyebrow="Portfólio"
        lines={[<>Nossos <em>projetos</em></>]}
        text="Mais de 500 ambientes entregues. Veja como cada espaço ganhou marcenaria feita para ele."
      />
      <section className="sec light">
        <div className="mb-10 flex flex-wrap gap-2">
          <Link href="/projetos" scroll={false} className="chip" aria-current={!room ? "true" : undefined}>
            Todos <small className="opacity-70">{all.length}</small>
          </Link>
          {rooms.map((r) => (
            <Link key={r} href={`/projetos?comodo=${encodeURIComponent(r)}`} scroll={false} className="chip" aria-current={room === r ? "true" : undefined}>
              {r} <small className="opacity-70">{all.filter((p) => p.room === r).length}</small>
            </Link>
          ))}
        </div>
        {list.length ? (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
          </div>
        ) : (
          <p className="text-muted">Ainda não há projetos publicados neste cômodo.</p>
        )}
      </section>
      <CtaFinal />
    </>
  );
}
