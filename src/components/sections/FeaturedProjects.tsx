import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'

const PROJECTS = [
  { id: 1, title: 'Home Office Moderno', room: 'Escritório', city: 'São Paulo', year: 2024, bg: '#7a6550' },
  { id: 2, title: 'Suite Master Completa', room: 'Quarto', city: 'Campinas', year: 2024, bg: '#5a7a65' },
  { id: 3, title: 'Cozinha Gourmet', room: 'Cozinha', city: 'São Paulo', year: 2023, bg: '#5a6a7a' },
]

export default function FeaturedProjects() {
  return (
    <section className="py-20 bg-[#FAFAF8]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs text-brown-md font-medium uppercase tracking-[0.12em] mb-3">Portfólio</p>
          <h2 className="font-serif text-3xl md:text-4xl text-nav mb-3">Projetos recentes</h2>
          <p className="text-gray-1 text-base max-w-md mx-auto leading-relaxed">
            Cada projeto é único — criado para o espaço e o estilo de vida do cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="group border border-[#E8E6E0] rounded-[12px] overflow-hidden bg-white hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 cursor-pointer"
            >
              {/* Imagem placeholder — substituir por <Image> quando tiver fotos */}
              <div
                className="h-52 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: p.bg }}
              >
                <span className="text-white/20 font-serif text-lg select-none">{p.title}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                  <Link
                    href="/projetos"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-nav text-sm font-medium px-5 py-2.5 rounded-[8px] no-underline"
                  >
                    Ver projeto
                  </Link>
                </div>
                <span className="absolute top-3 left-3 bg-nav/80 text-gold text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {p.room}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-nav text-[15px] mb-1">{p.title}</h3>
                <p className="text-xs text-gray-2">{p.city} · {p.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 border border-[#D4D2CC] text-nav text-sm font-medium px-7 py-3 rounded-[10px] hover:border-cta hover:text-cta transition-colors no-underline"
          >
            Ver todos os projetos <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
