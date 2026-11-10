import type { Metadata } from "next";
import { Lines, PageHead } from "@/components/Blocks";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { whatsUrl } from "@/lib/format";
import { getCompany } from "@/lib/company";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contato" };

export default async function Contato() {
  const c = await getCompany();
  return (
    <>
      <PageHead eyebrow="Contato" lines={[<>Peça seu <em>orçamento</em></>]} text="Tire dúvidas, solicite um orçamento ou venha nos visitar no ateliê em São Paulo." />

      <section className="sec light">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
          <div data-rv>
            <ContactForm />
          </div>
          <aside className="flex flex-col gap-4" data-rv>
            <div className="rounded-2xl bg-forest p-6 text-cream">
              <h3 className="serif text-2xl">Resposta mais rápida</h3>
              <p className="mb-5 mt-2 text-sage">Fale direto com a nossa equipe pelo WhatsApp.</p>
              <a href={whatsUrl("Olá! Gostaria de um orçamento.", c.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-whats w-full">Iniciar conversa</a>
            </div>
            <div className="rounded-2xl bg-surface p-6">
              <h3 className="mb-3 font-semibold">Onde nos encontrar</h3>
              <p className="text-muted">{c.address}</p>
              <p className="mt-2 text-muted">{c.phoneLabel}</p>
              <a href={`mailto:${c.email}`} className="mt-2 block text-muted underline">{c.email}</a>
            </div>
            <div className="rounded-2xl bg-surface p-6">
              <h3 className="mb-3 font-semibold">Horário de atendimento</h3>
              <dl className="divide-y divide-line text-sm">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex justify-between py-2">
                    <dt className="text-muted">{h.day}</dt>
                    <dd className="font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--surface)" }}>
        <div className="head">
          <div>
            <span className="eyebrow">Dúvidas</span>
            <Lines lines={[<>Perguntas <em>frequentes</em></>]} />
          </div>
        </div>
        <Faq />
      </section>
    </>
  );
}
