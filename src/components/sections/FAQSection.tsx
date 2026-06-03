'use client'

import { useState, useRef, useEffect } from 'react'
import { IconPlus, IconMinus } from '@tabler/icons-react'

export const FAQ_ITEMS = [
  {
    question: 'Quanto tempo leva para fabricar e entregar?',
    answer: 'O prazo médio é de 30 a 45 dias úteis após a aprovação do projeto e pagamento do sinal. Projetos maiores, como cozinhas completas, podem levar até 60 dias. Você recebe atualizações durante toda a produção.',
  },
  {
    question: 'Vocês atendem fora de São Paulo?',
    answer: 'Atendemos São Paulo e toda a Grande SP (ABCD, Guarulhos, Osasco, etc.). Para cidades do interior, consulte disponibilidade — analisamos caso a caso dependendo do tamanho do projeto.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Trabalhamos com 50% de entrada na aprovação do projeto e 50% na entrega. Aceitamos Pix, transferência bancária e cartão de crédito (parcelamento disponível mediante consulta).',
  },
  {
    question: 'Os móveis têm garantia?',
    answer: 'Sim! Todos os nossos móveis têm garantia de 5 anos contra defeitos de fabricação. Ferragens e acessórios seguem a garantia do fabricante (geralmente 1 a 2 anos). Problemas de instalação cobertos por 1 ano.',
  },
  {
    question: 'Posso ver os materiais antes de decidir?',
    answer: 'Claro. Durante a visita de medição, nosso consultor leva amostras de acabamentos, cores de MDF, puxadores e ferragens. Você escolhe cada detalhe com calma, sem pressa.',
  },
  {
    question: 'Vocês fazem o projeto 3D antes?',
    answer: 'Sim. Após a visita e medição, desenvolvemos um projeto 3D completo para você visualizar exatamente como ficará o ambiente. Só enviamos para produção com sua aprovação.',
  },
]

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div className={`border rounded-[10px] overflow-hidden bg-white transition-colors duration-200 ${isOpen ? 'border-gold/50' : 'border-[#E8E6E0]'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-[#FAFAF8] transition-colors"
      >
        <span className="font-medium text-nav text-[15px] leading-snug">{question}</span>
        <span className={`shrink-0 transition-colors duration-200 ${isOpen ? 'text-gold' : 'text-cta'}`}>
          <span className={`block transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
            {isOpen ? <IconMinus size={18} /> : <IconPlus size={18} />}
          </span>
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{ height, overflow: 'hidden', transition: 'height 0.3s ease' }}
      >
        <div className="px-6 pb-5 text-gray-1 text-sm leading-relaxed border-t border-[#E8E6E0] pt-4">
          {answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-[#FAFAF8]">
      <div className="max-w-[760px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs text-brown-md font-medium uppercase tracking-[0.12em] mb-3">Dúvidas frequentes</p>
          <h2 className="font-serif text-3xl md:text-4xl text-nav mb-4">Perguntas frequentes</h2>
          <p className="text-gray-1 text-base leading-relaxed">
            Ainda tem dúvida? Fale com a gente no WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
