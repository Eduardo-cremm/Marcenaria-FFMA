import type { Metadata } from "next";
import { CtaFinal, Lines, PageHead } from "@/components/Blocks";
import { Photo } from "@/components/Photo";
import { getCompany } from "@/lib/company";

export const metadata: Metadata = { title: "Sobre" };

const values = [
  { t: "Qualidade", d: "Materiais selecionados e ferragens de primeira linha em todas as peças." },
  { t: "Ofício", d: "Produção própria, no nosso ateliê, por uma equipe que faz isso há décadas." },
  { t: "Personalização", d: "Medidas, cores e acabamentos definidos com você, para o seu espaço." },
];

// Texto provisório, usado enquanto a história não é preenchida em Admin > Configurações.
const fallback = [
  "A Marcenaria FFMA nasceu como um pequeno ateliê familiar em São Paulo. Crescemos mantendo o que nos trouxe até aqui: qualidade, honestidade e cuidado em cada detalhe.",
  "Trabalhamos com carvalho, freijó, cedro e MDF de alta qualidade, e acompanhamos cada projeto do primeiro desenho à instalação.",
];

export default async function Sobre() {
  const { history: text } = await getCompany();
  const history = text ? text.split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean) : fallback;
  return (
    <>
      <PageHead eyebrow="Sobre" lines={["Uma família dedicada", <>à <em>marcenaria</em></>]} text="Há mais de 30 anos fazendo móveis sob medida em São Paulo." />

      <section className="sec light">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div data-rv>
            <span className="eyebrow">Nossa história</span>
            {history.map((t, i) => (
              <p key={i} className={`${i ? "mt-4" : "mt-5"} text-lg text-muted`}>{t}</p>
            ))}
          </div>
          <Photo tone="d" label="Foto do ateliê" className="aspect-[4/3] rounded-[14px]" />
        </div>
      </section>

      <section className="sec" style={{ background: "var(--surface)" }}>
        <div className="head">
          <div>
            <span className="eyebrow">Valores</span>
            <Lines lines={[<>O que nos <em>guia</em></>]} />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.t} className="border-t border-line pt-6" data-rv>
              <span className="text-[13px] font-semibold text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="serif mt-2 text-3xl">{v.t}</h3>
              <p className="mt-2 text-muted">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec light">
        <div className="nums !grid-cols-2 md:!grid-cols-4" data-rv>
          <div><strong><span data-n="30">30</span>+</strong><span>anos em São Paulo</span></div>
          <div><strong><span data-n="500">500</span>+</strong><span>ambientes entregues</span></div>
          <div><strong><span data-n="5">5</span>★</strong><span>avaliação média</span></div>
          <div><strong><span data-n="100">100</span>%</strong><span>produção própria</span></div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
