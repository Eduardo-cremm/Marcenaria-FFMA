import Link from 'next/link'
import { IconBrandInstagram, IconBrandWhatsapp, IconBrandFacebook, IconBrandPinterest } from '@tabler/icons-react'
import Logo from '@/components/ui/Logo'

const NAV = [
  { href: '/', label: 'Início' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/loja', label: 'Loja' },
  { href: '/contato', label: 'Contato' },
]

const CATEGORIES = [
  'Sala de Estar', 'Quarto', 'Cozinha', 'Escritório', 'Banheiro', 'Varanda',
]

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'

  return (
    <footer className="bg-nav text-gray-3">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="text-sm text-gray-2 leading-relaxed max-w-[200px]">
            Marcenaria artesanal em São Paulo. Móveis sob medida com madeira de qualidade e acabamento artesanal.
          </p>
          <div className="flex gap-3">
            {[
              { icon: <IconBrandInstagram size={18} />, label: 'Instagram', href: '#' },
              { icon: <IconBrandWhatsapp size={18} />, label: 'WhatsApp', href: `https://wa.me/${phone}` },
              { icon: <IconBrandFacebook size={18} />, label: 'Facebook', href: '#' },
              { icon: <IconBrandPinterest size={18} />, label: 'Pinterest', href: '#' },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-[#3a3a38] flex items-center justify-center text-gray-2 hover:text-gold hover:border-gold transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navegação */}
        <div>
          <h4 className="text-sm font-medium text-gray-3 uppercase tracking-widest mb-5">Navegação</h4>
          <ul className="flex flex-col gap-3">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-gray-2 hover:text-gold transition-colors no-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categorias */}
        <div>
          <h4 className="text-sm font-medium text-gray-3 uppercase tracking-widest mb-5">Categorias</h4>
          <ul className="flex flex-col gap-3">
            {CATEGORIES.map(cat => (
              <li key={cat}>
                <Link
                  href={`/loja?categoria=${cat.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[̀-ͯ]/g, '')}`}
                  className="text-sm text-gray-2 hover:text-gold transition-colors no-underline"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-sm font-medium text-gray-3 uppercase tracking-widest mb-5">Contato</h4>
          <div className="flex flex-col gap-3 text-sm text-gray-2">
            <p className="leading-relaxed">Rua das Madeiras, 123<br />São Paulo – SP</p>
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer"
              className="text-whats hover:underline no-underline">
              (11) 99999-9999
            </a>
            <a href="mailto:contato@ffmamarcenaria.com.br"
              className="hover:text-gold transition-colors no-underline">
              contato@ffmamarcenaria.com.br
            </a>
            <div className="mt-1">
              <p>Seg–Sex: 08h–18h</p>
              <p>Sáb: 09h–13h</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#3a3a38] px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-2">
        <span>© {new Date().getFullYear()} FFMA Marcenaria. Todos os direitos reservados.</span>
        <span>Feito com ♥ em madeira maciça</span>
      </div>
    </footer>
  )
}
