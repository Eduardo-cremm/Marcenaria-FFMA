import { IconStar } from '@tabler/icons-react'

const TESTIMONIALS = [
  {
    name: 'Mariana Costa',
    city: 'São Paulo – SP',
    room: 'Quarto planejado',
    rating: 5,
    text: 'Fiquei impressionada com o resultado. O quarto ficou exatamente como imaginei — cada detalhe foi respeitado. Atendimento impecável do início ao fim.',
    initials: 'MC',
    bg: '#7a6550',
  },
  {
    name: 'Carlos Andrade',
    city: 'Guarulhos – SP',
    room: 'Cozinha sob medida',
    rating: 5,
    text: 'A cozinha ficou incrível. Aproveitaram cada centímetro do espaço e entregaram antes do prazo. Com certeza voltarei para o home office.',
    initials: 'CA',
    bg: '#5a7a65',
  },
  {
    name: 'Fernanda Lima',
    city: 'Santo André – SP',
    room: 'Sala de estar',
    rating: 5,
    text: 'Qualidade excelente e preço justo. A parede de nichos transformou completamente a sala. Recomendo para todo mundo que me pergunta.',
    initials: 'FL',
    bg: '#5a6a7a',
  },
  {
    name: 'Roberto Mendes',
    city: 'São Paulo – SP',
    room: 'Escritório completo',
    rating: 5,
    text: 'Profissionais sérios que cumprem o que prometem. O escritório ficou funcional e bonito. A equipe de montagem foi muito cuidadosa.',
    initials: 'RM',
    bg: '#6a5a7a',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <IconStar key={i} size={14} className="text-gold fill-gold" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs text-brown-md font-medium uppercase tracking-[0.12em] mb-3">Depoimentos</p>
          <h2 className="font-serif text-3xl md:text-4xl text-nav mb-4">O que nossos clientes dizem</h2>
          <p className="text-gray-1 text-base max-w-md mx-auto leading-relaxed">
            Mais de 300 famílias satisfeitas em São Paulo e região.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map(({ name, city, room, rating, text, initials, bg }) => (
            <div
              key={name}
              className="border border-[#E8E6E0] rounded-[12px] p-6 bg-[#FAFAF8] hover:shadow-card-hover transition-shadow"
            >
              <Stars count={rating} />
              <p className="text-gray-1 text-[15px] leading-relaxed my-4 italic">&ldquo;{text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E8E6E0]">
                {/* Avatar placeholder — substituir por <Image> quando tiver fotos */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  {initials}
                </div>
                <div>
                  <div className="text-nav font-medium text-sm">{name}</div>
                  <div className="text-gray-2 text-xs">{city} · {room}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Média geral */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Stars count={5} />
          <span className="text-gray-1 text-sm">
            <strong className="text-nav">5.0</strong> de avaliação média · baseado em +120 avaliações verificadas
          </span>
        </div>
      </div>
    </section>
  )
}
