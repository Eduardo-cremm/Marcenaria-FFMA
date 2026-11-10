import Link from "next/link";
import { getCompany } from "@/lib/company";
import type { Product, Project } from "@/lib/data";
import { brl, whatsUrl } from "@/lib/format";
import { processSteps } from "@/lib/site";
import { AddToCart } from "./Cart";
import { Photo } from "./Photo";

/** Título com entrada linha por linha. Cada item de `lines` é uma linha. */
export function Lines({ as: Tag = "h2", lines, className = "serif" }: { as?: "h1" | "h2"; lines: React.ReactNode[]; className?: string }) {
  return (
    <Tag className={`${className} rl`}>
      {lines.map((l, i) => (
        <span className="ln" key={i}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export function PageHead({ eyebrow, lines, text }: { eyebrow: string; lines: React.ReactNode[]; text?: string }) {
  return (
    <section className="page-head dark">
      <span className="eyebrow">{eyebrow}</span>
      <Lines as="h1" lines={lines} />
      {text && <p data-rv>{text}</p>}
    </section>
  );
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card">
      <Link href={`/loja/${p.slug}`} className="relative block">
        {p.badge && <span className="tag">{p.badge}</span>}
        <Photo tone={p.tone} src={p.images?.[0]} label="Foto · produto" alt={p.name} sizes="(max-width: 900px) 50vw, 25vw" />
      </Link>
      <div className="info">
        <h3>
          <Link href={`/loja/${p.slug}`}>{p.name}</Link>
        </h3>
        <small>
          {p.category} · {p.detail}
        </small>
        <div className="row">
          <span className="price">{brl(p.price)}</span>
          <AddToCart item={{ id: p.id, slug: p.slug, name: p.name, price: p.price, finish: p.finishes[0], tone: p.tone }} />
        </div>
      </div>
    </article>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projetos/${p.slug}`} className="group block" data-rv>
      <div className="overflow-hidden rounded-[10px]">
        <Photo tone={p.tone} src={p.images?.[0]} label={`Foto · ${p.room.toLowerCase()}`} alt={p.title} className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex justify-between gap-3 pt-3 text-[14.5px]">
        <b className="font-semibold">{p.title}</b>
        <span className="text-muted">
          {p.room} · {p.city}
        </span>
      </div>
    </Link>
  );
}

export function Steps() {
  return (
    <div className="steps">
      <span className="fill" aria-hidden="true" />
      <ol className="list-none">
        {processSteps.map((s, i) => (
          <li key={s.title}>
            <i>{String(i + 1).padStart(2, "0")}</i>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export async function CtaFinal() {
  const c = await getCompany();
  return (
    <section className="cta-sec dark" id="orcamento">
      <div className="mq" aria-hidden="true">
        <span className="mq-in">cozinhas · closets · salas · escritórios · painéis · cozinhas · closets · salas</span>
      </div>
      <Lines lines={["Vamos conversar sobre", <>o <em>seu</em> projeto?</>]} />
      <p data-rv>Orçamento sem compromisso. Atendemos a Grande São Paulo e o interior.</p>
      <div className="flex flex-wrap justify-center gap-3 px-6" data-rv>
        <a href={whatsUrl("Olá! Gostaria de um orçamento.", c.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-brass">
          Chamar no WhatsApp
        </a>
        <Link href="/contato" className="btn btn-ghost">
          Enviar mensagem
        </Link>
      </div>
    </section>
  );
}
