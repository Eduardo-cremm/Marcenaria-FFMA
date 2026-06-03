'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IconArrowRight, IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

const SLIDES = [
  { bg: '#3a2a1a', label: 'Sala de Estar sob medida' },
  { bg: '#2a1f15', label: 'Quarto planejado' },
  { bg: '#1e2a1a', label: 'Cozinha artesanal' },
]

const STATS = [
  { value: 300, suffix: '+', label: 'Projetos entregues' },
  { value: 15, suffix: ' anos', label: 'De experiência' },
  { value: 5, suffix: '★', label: 'Avaliação média' },
]

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1800
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [target])

  return <span>{count}{suffix}</span>
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [started, setStarted] = useState(false)
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'

  useEffect(() => {
    setStarted(true)
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const prev = () => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setCurrent(c => (c + 1) % SLIDES.length)

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ backgroundColor: SLIDES[current].bg, transition: 'background-color 0.8s ease' }}>
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />

      {/* Placeholder slides (swap with next/image when photos arrive) */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex items-center justify-center text-white/10 text-2xl font-serif transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundColor: s.bg }}
          >
            {/* Substituir pela tag <Image> quando tiver foto real */}
            <span className="select-none">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-12 w-full py-20">
        <div className="max-w-[580px]">
          <span className="inline-block text-xs text-brown-md font-medium uppercase tracking-[0.12em] mb-5 bg-cream/90 px-3 py-1.5 rounded-full">
            Marcenaria artesanal em São Paulo
          </span>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.1] mb-6">
            Móveis que contam{' '}
            <span className="text-gold italic">a história</span>{' '}
            da sua casa
          </h1>

          <p className="text-base text-white/75 leading-relaxed mb-10 max-w-[480px]">
            Fabricamos sob medida com madeira de qualidade e acabamento artesanal. Cada peça é única, feita para durar gerações.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <Link
              href="/projetos"
              className="bg-cta text-cream font-medium px-7 py-3.5 rounded-[10px] flex items-center gap-2 hover:bg-brown-md transition-colors no-underline text-sm w-fit"
            >
              Ver projetos realizados <IconArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${phone}?text=Olá! Gostaria de saber mais sobre os móveis da FFMA.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whats text-white font-medium px-7 py-3.5 rounded-[10px] flex items-center gap-2 hover:opacity-90 transition-opacity no-underline text-sm w-fit"
            >
              <IconBrandWhatsapp size={18} /> Falar no WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 border-t border-white/20 pt-8">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label}>
                <div className="font-serif text-3xl text-gold font-normal">
                  {started ? <AnimatedCounter target={value} suffix={suffix} /> : `0${suffix}`}
                </div>
                <div className="text-xs text-white/60 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <button onClick={prev} className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:border-white/60 hover:text-white transition-colors">
          <IconChevronLeft size={18} />
        </button>
        <div className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-gold w-6' : 'bg-white/30 w-1.5'}`} />
          ))}
        </div>
        <button onClick={next} className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:border-white/60 hover:text-white transition-colors">
          <IconChevronRight size={18} />
        </button>
      </div>
    </section>
  )
}
