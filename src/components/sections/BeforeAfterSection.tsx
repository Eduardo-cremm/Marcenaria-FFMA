const CASES = [
  {
    id: 1,
    title: 'Quarto pequeno → Suite planejada',
    description: '12m² transformados com armário embutido, cabeceira com nichos e gaveteiro sob a cama.',
    beforeBg: '#4a4038',
    afterBg: '#7a6550',
  },
  {
    id: 2,
    title: 'Cozinha antiga → Cozinha gourmet',
    description: 'Armários até o teto, ilha central e cantinho do café integrado ao projeto.',
    beforeBg: '#3a4038',
    afterBg: '#5a7a65',
  },
  {
    id: 3,
    title: 'Sala vazia → Home office integrado',
    description: 'Estante TV com nichos, bancada de trabalho e painel ripado dividindo os ambientes.',
    beforeBg: '#383a4a',
    afterBg: '#5a6a7a',
  },
]

function BeforeAfterCard({ title, description, beforeBg, afterBg }: (typeof CASES)[0]) {
  return (
    <div className="border border-[#E8E6E0] rounded-[12px] overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-shadow">
      {/* Imagens antes/depois lado a lado */}
      <div className="flex h-52 relative">
        <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: beforeBg }}>
          {/* Substituir por <Image> com foto real */}
          <span className="text-white/20 text-xs select-none uppercase tracking-widest">Antes</span>
        </div>
        <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: afterBg }}>
          {/* Substituir por <Image> com foto real */}
          <span className="text-white/20 text-xs select-none uppercase tracking-widest">Depois</span>
        </div>

        {/* Divisor central */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/60 z-10" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center z-20">
          <div className="bg-white text-nav text-[10px] font-medium px-2 py-1 rounded-full shadow-sm tracking-wide">
            antes / depois
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">Antes</span>
        <span className="absolute top-3 right-3 bg-cta text-white text-[10px] px-2 py-0.5 rounded-full">Depois</span>
      </div>

      <div className="p-5">
        <h3 className="font-medium text-nav text-[15px] mb-1.5">{title}</h3>
        <p className="text-sm text-gray-1 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function BeforeAfterSection() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs text-brown-md font-medium uppercase tracking-[0.12em] mb-3">Transformações reais</p>
          <h2 className="font-serif text-3xl md:text-4xl text-nav mb-4">Antes e depois</h2>
          <p className="text-gray-1 text-base max-w-md mx-auto leading-relaxed">
            Veja como ambientes comuns se transformam com móveis planejados sob medida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <BeforeAfterCard key={c.id} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
