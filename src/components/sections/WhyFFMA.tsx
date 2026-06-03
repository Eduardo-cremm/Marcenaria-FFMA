import { IconRuler, IconStack2, IconMoodHappy, IconPalette } from '@tabler/icons-react'

const DIFFERENTIALS = [
  {
    icon: <IconRuler size={28} />,
    title: 'Sob medida de verdade',
    desc: 'Cada projeto parte das suas medidas exatas e da sua rotina. Nada de catálogo, tudo pensado para o seu espaço.',
  },
  {
    icon: <IconStack2 size={28} />,
    title: 'MDF e pintura Laca',
    desc: 'Trabalhamos com MDF de alta qualidade e pintura Laca — acabamento liso, resistente e de visual sofisticado para qualquer ambiente.',
  },
  {
    icon: <IconMoodHappy size={28} />,
    title: 'Atendimento próximo',
    desc: 'Do orçamento à entrega, você fala diretamente com quem faz. Sem intermediários, sem surpresas.',
  },
  {
    icon: <IconPalette size={28} />,
    title: 'Personalização total',
    desc: 'Cor, textura, puxador, altura, divisória interna — cada detalhe é escolhido por você. O móvel se adapta à sua vida, não o contrário.',
  },
]

export default function WhyFFMA() {
  return (
    <section className="py-24 bg-nav overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — text + diferenciais */}
          <div>
            <p className="text-xs text-gold font-medium uppercase tracking-[0.12em] mb-3">Por que FFMA</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-5 leading-[1.2]">
              Artesanato com precisão,{' '}
              <span className="text-gold italic">resultado que dura</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10 max-w-[440px]">
              Mais de 15 anos fabricando móveis planejados em São Paulo. Combinamos design funcional com MDF de qualidade e equipamentos de precisão para um resultado impecável.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {DIFFERENTIALS.map(({ icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-[10px] bg-white/10 flex items-center justify-center text-gold shrink-0">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-[15px] mb-1">{title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — placeholder workshop image */}
          <div className="relative hidden md:block">
            <div
              className="rounded-[16px] overflow-hidden aspect-[4/5] flex items-center justify-center"
              style={{ backgroundColor: '#3d2f1f' }}
            >
              {/* Substituir por <Image> com foto real do workshop */}
              <span className="text-white/10 font-serif text-xl select-none">Foto do workshop</span>
            </div>
            {/* Badge flutuante */}
            <div className="absolute -bottom-5 -left-5 bg-gold text-nav font-medium text-sm px-5 py-3 rounded-[10px] shadow-card-hover">
              +300 projetos entregues
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
