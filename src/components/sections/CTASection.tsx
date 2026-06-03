import Link from 'next/link'
import { IconBrandWhatsapp, IconArrowRight } from '@tabler/icons-react'

export default function CTASection() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'

  return (
    <section className="py-24 bg-nav overflow-hidden relative">
      {/* Detalhe decorativo */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold/5 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gold/5 pointer-events-none" />

      <div className="relative max-w-[720px] mx-auto px-6 md:px-12 text-center">
        <p className="text-xs text-gold font-medium uppercase tracking-[0.12em] mb-4">Pronto para começar?</p>

        <h2 className="font-serif text-3xl md:text-[42px] text-white leading-[1.2] mb-5">
          Transforme seu espaço com{' '}
          <span className="text-gold italic">móveis sob medida</span>
        </h2>

        <p className="text-white/60 text-base leading-relaxed mb-10 max-w-[480px] mx-auto">
          Fale com a nossa equipe, conte o que precisa e receba um orçamento sem compromisso. Atendimento rápido e personalizado.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${phone}?text=Olá! Gostaria de solicitar um orçamento para móveis planejados.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whats text-white font-medium px-8 py-4 rounded-[10px] flex items-center gap-2.5 hover:opacity-90 transition-opacity no-underline text-sm"
          >
            <IconBrandWhatsapp size={20} />
            Pedir orçamento pelo WhatsApp
          </a>
          <Link
            href="/contato"
            className="border border-white/30 text-white font-medium px-8 py-4 rounded-[10px] flex items-center gap-2 hover:border-white/60 transition-colors no-underline text-sm"
          >
            Formulário de cotação <IconArrowRight size={16} />
          </Link>
        </div>

        <p className="mt-6 text-white/35 text-xs">
          Respondemos em até 2 horas em dias úteis · Atendimento de seg–sáb, 08h–18h
        </p>
      </div>
    </section>
  )
}
