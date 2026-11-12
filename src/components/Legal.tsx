import type { Company } from "@/lib/company";

export const LEGAL_UPDATED = "11 de novembro de 2026";

/** Cabeçalho e corpo de texto das páginas legais (privacidade e termos). */
export function LegalPage({ eyebrow, title, intro, toc, children }: {
  eyebrow: string;
  title: string;
  intro: string;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="page-head dark">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="serif">{title}</h1>
        <p>{intro}</p>
      </section>
      <section className="sec light">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Nesta página" className="h-fit text-sm lg:sticky lg:top-28">
            <span className="eyebrow mb-3">Nesta página</span>
            <ol className="grid gap-2 text-muted">
              {toc.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="hover:text-ink">{t.label}</a></li>
              ))}
            </ol>
          </nav>
          <article className="legal">
            {children}
            <p className="!mt-12 text-sm">Última atualização: {LEGAL_UPDATED}.</p>
          </article>
        </div>
      </section>
    </>
  );
}

/** Identificação da empresa exigida pelo Decreto 7.962/2013 (art. 2º). */
export function CompanyId({ c }: { c: Company }) {
  return (
    <ul>
      <li><b>Nome empresarial:</b> {c.legalName || "Marcenaria FFMA"}</li>
      {c.cnpj && <li><b>CNPJ:</b> {c.cnpj}</li>}
      <li><b>Endereço:</b> {c.address}</li>
      <li><b>E-mail:</b> <a href={`mailto:${c.email}`}>{c.email}</a></li>
      <li><b>WhatsApp:</b> {c.phoneLabel}</li>
    </ul>
  );
}
