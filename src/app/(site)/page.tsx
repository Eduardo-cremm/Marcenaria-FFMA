import Link from "next/link";
import { CtaFinal, Lines, ProductCard, Steps } from "@/components/Blocks";
import { HomeMotion } from "@/components/HomeMotion";
import { Blade } from "@/components/Logo";
import { Photo } from "@/components/Photo";
import { HeroTitle } from "@/components/RotatingWord";
import { getProducts, getProjects, services } from "@/lib/data";
import { processSteps } from "@/lib/site";

const Arrow = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default async function Home() {
  const projects = (await getProjects()).filter((p) => p.featured).slice(0, 6);
  const products = (await getProducts()).filter((p) => p.featured).slice(0, 4);
  const rows = [
    ...services.map((s) => ({ href: `/projetos?comodo=${encodeURIComponent(s.room ?? "")}`, title: s.title, text: s.text, tone: s.tone })),
    { href: "/loja", title: "Peças prontas", text: "Móveis da nossa loja, com escolha de acabamento.", tone: "b" },
  ];

  return (
    <>
      <HomeMotion />
      <div className="intro" aria-hidden="true">
        <Blade width={120} />
      </div>

      <div className="hero-wrap">
        <section className="hero dark">
          <div className="hero-media">
            <Photo tone="a" label="Vídeo ou foto do ateliê" />
            <div className="hero-shade" />
          </div>
          <div className="hero-copy">
            <span className="eyebrow hi">Marcenaria sob medida · São Paulo</span>
            <HeroTitle />
            <p className="hi">Projetamos, produzimos e instalamos cozinhas, closets, salas e escritórios. Há mais de 30 anos, uma família cuidando de cada peça.</p>
            <div className="hero-cta hi">
              <Link href="/contato" className="btn btn-brass">Pedir orçamento</Link>
              <Link href="/projetos" className="btn btn-ghost">Ver projetos</Link>
            </div>
            <div className="hero-stats hi">
              <div><strong>30+</strong><span>anos de ofício</span></div>
              <div><strong>500+</strong><span>projetos entregues</span></div>
              <div><strong>1 ano</strong><span>de garantia</span></div>
            </div>
          </div>
          <div className="hero-caption">
            <p className="serif">Cada peça começa com uma conversa e termina instalada na sua casa.</p>
          </div>
          <div className="scroll-hint"><i />Role a página</div>
        </section>
      </div>

      <section className="sec light svc-sec">
        <div className="head">
          <div>
            <span className="eyebrow">Sob medida</span>
            <Lines lines={[<>O que <em>fazemos</em></>]} />
          </div>
          <p data-rv>Cada ambiente começa com uma conversa e uma medição no local. O projeto é seu, do desenho à instalação.</p>
        </div>
        <div className="svc">
          {rows.map((r, i) => (
            <Link href={r.href} key={r.title} data-ph={`ph-${r.tone}`}>
              <i>{String(i + 1).padStart(2, "0")}</i>
              <h3 className="serif">{r.title}</h3>
              <p>{r.text}</p>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      <div className="peek ph ph-a" aria-hidden="true" />

      {/* O div em volta é do React; o GSAP mexe só dentro dele ao prender a seção no scroll. */}
      <div>
      <section className="gal dark">
        <div className="head">
          <div>
            <span className="eyebrow">Portfólio</span>
            <Lines lines={[<>Projetos <em>recentes</em></>]} />
          </div>
          <Link href="/projetos" className="more">Ver todos os projetos</Link>
        </div>
        <div className="track">
          {projects.map((p) => (
            <figure key={p.slug}>
              <Link href={`/projetos/${p.slug}`}>
                <Photo tone={p.tone} src={p.images?.[0]} label={`Foto · ${p.room.toLowerCase()}`} alt={p.title} />
                <figcaption>
                  <b>{p.title}</b>
                  <span>{p.city} · {p.year}</span>
                </figcaption>
              </Link>
            </figure>
          ))}
          <div className="last">
            <div>
              <b>Mais de 500 ambientes entregues</b>
              <Link href="/projetos" className="btn btn-brass">Ver todos</Link>
            </div>
          </div>
        </div>
        <div className="gal-foot">
          <span id="galN">01 / {String(projects.length).padStart(2, "0")}</span>
          <div className="gal-bar"><i id="galBar" /></div>
          <span>Role para avançar</span>
        </div>
      </section>
      </div>

      <div>
      <section className="sec light proc-pin">
        <div className="proc-in">
          <div>
            <span className="eyebrow">Como funciona</span>
            <Lines lines={["Do primeiro contato", <>à <em>instalação</em></>]} />
            <div className="big serif" aria-hidden="true">
              <span id="bigN">01</span>
              <small>/ {String(processSteps.length).padStart(2, "0")}</small>
            </div>
            <p className="proc-note">Prazo médio de 20 a 45 dias úteis, informado no orçamento.</p>
          </div>
          <Steps />
        </div>
      </section>
      </div>

      <section className="sec" style={{ background: "var(--surface)" }}>
        <div className="head">
          <div>
            <span className="eyebrow">Loja</span>
            <Lines lines={[<>Peças <em>prontas</em></>]} />
          </div>
          <Link href="/loja" className="more">Ver a loja completa</Link>
        </div>
        <div className="shop">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="sec light about">
        <div>
          <span className="eyebrow">Quem já fez com a gente</span>
          <blockquote className="serif" data-rv>
            “Entregaram no prazo, instalaram em um dia e a cozinha ficou exatamente como no projeto.”
            <cite>Depoimento de exemplo · cliente em Perdizes</cite>
          </blockquote>
        </div>
        <div className="nums" data-rv>
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
