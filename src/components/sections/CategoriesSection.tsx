import Link from 'next/link'
import { IconSofa, IconBed, IconToolsKitchen2, IconBriefcase, IconBath, IconTrees, IconArrowRight } from '@tabler/icons-react'

const CATEGORIES = [
  { icon: <IconSofa size={28} />, name: 'Sala de Estar', slug: 'sala' },
  { icon: <IconBed size={28} />, name: 'Quarto', slug: 'quarto' },
  { icon: <IconToolsKitchen2 size={28} />, name: 'Cozinha', slug: 'cozinha' },
  { icon: <IconBriefcase size={28} />, name: 'Escritório', slug: 'escritorio' },
  { icon: <IconBath size={28} />, name: 'Banheiro', slug: 'banheiro' },
  { icon: <IconTrees size={28} />, name: 'Varanda', slug: 'varanda' },
]

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs text-brown-md font-medium uppercase tracking-[0.12em] mb-3">Especialidades</p>
          <h2 className="font-serif text-3xl md:text-4xl text-nav mb-3">O que fazemos</h2>
          <p className="text-gray-1 text-base max-w-md mx-auto leading-relaxed">
            Transformamos qualquer ambiente da sua casa com móveis exclusivos e personalizados.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map(({ icon, name, slug }) => (
            <Link
              key={slug}
              href={`/projetos?comodo=${slug}`}
              className="group border border-[#E8E6E0] rounded-[10px] p-6 flex items-center justify-between bg-bg hover:bg-white hover:border-gold hover:shadow-card-hover transition-all duration-200 no-underline"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[10px] bg-cream flex items-center justify-center text-brown-md group-hover:bg-gold/20 group-hover:text-brown-dk transition-colors">
                  {icon}
                </div>
                <span className="font-medium text-nav text-sm md:text-base">{name}</span>
              </div>
              <IconArrowRight size={16} className="text-gray-3 group-hover:text-cta group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
