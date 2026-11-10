import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHead, ProjectCard } from "@/components/Blocks";
import { Photo } from "@/components/Photo";
import { getCompany } from "@/lib/company";
import { getProject, getProjects } from "@/lib/data";
import { whatsUrl } from "@/lib/format";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProject(params.slug);
  return { title: p?.title ?? "Projeto" };
}

export default async function Projeto({ params }: Props) {
  const p = await getProject(params.slug);
  if (!p) notFound();
  const company = await getCompany();
  const extra = (p.images ?? []).slice(3);
  const others = (await getProjects()).filter((o) => o.slug !== p.slug).slice(0, 3);
  const facts = [
    ["Local", p.city],
    ["Concluído em", p.date],
    ["Material", p.material],
    ["Prazo", p.leadTime],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHead eyebrow={p.room} lines={[p.title]} />
      <section className="sec light">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2" data-rv>
            <Photo tone={p.tone} src={p.images?.[0]} label="Foto principal" alt={p.title} className="aspect-[16/10] rounded-[10px] sm:col-span-2" />
            <Photo tone="c" src={p.images?.[1]} label="Foto · detalhe" className="aspect-square rounded-[10px]" />
            <Photo tone="b" src={p.images?.[2]} label="Foto · detalhe" className="aspect-square rounded-[10px]" />
            {extra.map((src) => <Photo key={src} src={src} className="aspect-square rounded-[10px]" />)}
          </div>
          <div data-rv>
            <p className="text-lg text-muted">{p.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-3">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-[10px] bg-surface p-4">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={whatsUrl(`Olá! Vi o projeto "${p.title}" no site e quero um orçamento parecido.`, company.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-whats mt-8 w-full">
              Quero um projeto assim
            </a>
            <Link href="/projetos" className="mt-4 block text-center text-sm font-semibold underline">
              Voltar para os projetos
            </Link>
          </div>
        </div>

        <h2 className="serif mb-8 mt-24 !text-4xl">Outros projetos</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => <ProjectCard key={o.slug} p={o} />)}
        </div>
      </section>
    </>
  );
}
