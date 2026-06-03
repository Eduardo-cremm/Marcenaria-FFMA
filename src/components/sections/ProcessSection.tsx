import { IconMessageCircle, IconRuler, IconTools, IconTruck, IconCheck } from '@tabler/icons-react'
import Link from 'next/link'

const STEPS = [
  {
    icon: <IconMessageCircle size={22} />,
    number: '01',
    title: 'Primeiro contato',
    desc: 'Você nos conta o que precisa — por WhatsApp, telefone ou formulário. Sem compromisso.',
  },
  {
    icon: <IconRuler size={22} />,
    number: '02',
    title: 'Visita e medição',
    desc: 'Nossa equipe vai até o seu espaço, mede tudo e entende seus gostos e necessidades.',
  },
  {
    icon: <IconCheck size={22} />,
    number: '03',
    title: 'Orçamento detalhado',
    desc: 'Você recebe um orçamento completo com materiais, acabamentos escolhidos e prazo de entrega. Sem letras miúdas.',
  },
  {
    icon: <IconTools size={22} />,
    number: '04',
    title: 'Produção artesanal',
    desc: 'Cada peça é fabricada no nosso ateliê com madeira selecionada e controle de qualidade em cada etapa.',
  },
  {
    icon: <IconTruck size={22} />,
    number: '05',
    title: 'Entrega e montagem',
    desc: 'Entregamos e montamos tudo com cuidado. Só finalizamos quando você estiver satisfeito.',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#FAFAF8]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="text-xs text-brown-md font-medium uppercase tracking-[0.12em] mb-3">Como funciona</p>
          <h2 className="font-serif text-3xl md:text-4xl text-nav mb-4">Do sonho à sua casa</h2>
          <p className="text-gray-1 text-base max-w-md mx-auto leading-relaxed">
            Um processo transparente, do primeiro contato até a montagem final.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#E8E6E0]" />

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={step.number} className={`flex items-center gap-8 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`bg-white border border-[#E8E6E0] rounded-[12px] p-6 shadow-card hover:shadow-card-hover transition-shadow max-w-sm ${isLeft ? 'md:ml-auto' : ''}`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-9 h-9 rounded-full bg-cta/10 flex items-center justify-center text-cta shrink-0">
                          {step.icon}
                        </div>
                        <span className="text-[11px] font-medium text-gray-3 uppercase tracking-widest">{step.number}</span>
                      </div>
                      <h3 className="font-medium text-nav text-[15px] mb-1.5">{step.title}</h3>
                      <p className="text-sm text-gray-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Dot central (desktop) */}
                  <div className="hidden md:flex w-px items-center justify-center shrink-0 relative">
                    <div className="w-4 h-4 rounded-full bg-gold border-4 border-[#FAFAF8] absolute" />
                  </div>

                  {/* Spacer do outro lado */}
                  <div className="flex-1 hidden md:block" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center mt-14">
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 bg-cta text-cream font-medium px-8 py-3.5 rounded-[10px] hover:bg-brown-md transition-colors no-underline text-sm"
          >
            Começar meu projeto
          </Link>
        </div>
      </div>
    </section>
  )
}
