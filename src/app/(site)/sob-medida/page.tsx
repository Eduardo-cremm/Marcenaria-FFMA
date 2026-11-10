import type { Metadata } from "next";
import Link from "next/link";
import { CtaFinal, Lines, PageHead, Steps } from "@/components/Blocks";
import { Faq } from "@/components/Faq";
import { Photo } from "@/components/Photo";
import { services } from "@/lib/data";

export const metadata: Metadata = { title: "Sob medida" };

export default function SobMedida() {
  return (
    <>
      <PageHead
        eyebrow="Sob medida"
        lines={["Do desenho", <>à <em>instalação</em></>]}
        text="Cada ambiente é medido, projetado e fabricado para o seu espaço. Você acompanha tudo, do primeiro desenho à montagem."
      />

      <section className="sec light">
        <div className="head">
          <div>
            <span className="eyebrow">Ambientes</span>
            <Lines lines={[<>O que <em>fazemos</em></>]} />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} href={`/projetos?comodo=${encodeURIComponent(s.room ?? "")}`} className="group block" data-rv>
              <div className="overflow-hidden rounded-[10px]">
                <Photo tone={s.tone} label={`Foto · ${s.title.toLowerCase()}`} className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="serif mt-4 text-3xl">{s.title}</h3>
              <p className="mt-1 text-muted">{s.text}</p>
              <span className="more mt-3 inline-block !text-sm">Ver projetos</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec" style={{ background: "var(--surface)" }}>
        <div className="proc-in !items-start">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Como funciona</span>
            <Lines lines={["Cinco etapas,", <>um <em>responsável</em></>]} />
            <p className="proc-note">Prazo médio de 20 a 45 dias úteis, informado no orçamento. Pagamento em duas partes: 50% na confirmação e 50% na entrega.</p>
          </div>
          <div data-rv>
            <Steps />
          </div>
        </div>
      </section>

      <section className="sec light">
        <div className="head">
          <div>
            <span className="eyebrow">Dúvidas</span>
            <Lines lines={[<>Perguntas <em>frequentes</em></>]} />
          </div>
        </div>
        <Faq />
      </section>

      <CtaFinal />
    </>
  );
}
