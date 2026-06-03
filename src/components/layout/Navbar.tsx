'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconShoppingCart, IconMenu2, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import Logo from '@/components/ui/Logo'
import { useCart } from '@/context/CartContext'

const NAV_LINKS = [
  { href: '/', label: 'Início' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/loja', label: 'Loja' },
  { href: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { itemCount, openCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-nav h-16 sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between shadow-sm">
      <Logo />

      {/* Desktop links */}
      <ul className="hidden md:flex gap-7 list-none">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`text-sm transition-colors duration-200 no-underline ${
                pathname === href ? 'text-gold' : 'text-gray-3 hover:text-gold'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop actions */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={openCart}
          className="relative text-gray-3 hover:text-gold transition-colors p-1"
          aria-label="Carrinho"
        >
          <IconShoppingCart size={22} />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-1.5 bg-cta text-brown-dk text-[10px] font-semibold w-[17px] h-[17px] rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
        <Link
          href="/loja"
          className="bg-cta text-cream text-sm font-medium px-4 py-1.5 rounded-[20px] hover:bg-brown-md transition-colors no-underline"
        >
          Ver Loja
        </Link>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={openCart} className="relative text-gray-3 p-1" aria-label="Carrinho">
          <IconShoppingCart size={22} />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-1.5 bg-cta text-brown-dk text-[10px] font-semibold w-[17px] h-[17px] rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-3 p-1"
          aria-label="Menu"
        >
          {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-nav border-t border-[#3a3a38] px-6 py-4 flex flex-col gap-4 md:hidden z-50">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm no-underline ${pathname === href ? 'text-gold' : 'text-gray-3'}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/loja"
            onClick={() => setMobileOpen(false)}
            className="bg-cta text-cream text-sm font-medium px-4 py-2 rounded-[20px] text-center no-underline w-fit"
          >
            Ver Loja
          </Link>
        </div>
      )}
    </nav>
  )
}
