'use client'

import { IconX, IconPlus, IconMinus, IconTrash, IconBrandWhatsapp } from '@tabler/icons-react'
import { useCart } from '@/context/CartContext'
import { formatBRL } from '@/lib/utils'
import Image from 'next/image'

export default function CartDrawer() {
  const { isOpen, items, closeCart, removeFromCart, updateQuantity, total, itemCount, checkout } = useCart()

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E6E0]">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl text-nav">Seu carrinho</h2>
            {itemCount > 0 && (
              <span className="bg-cta text-cream text-xs font-semibold px-2 py-0.5 rounded-full">{itemCount}</span>
            )}
          </div>
          <button onClick={closeCart} className="text-gray-2 hover:text-nav transition-colors p-1">
            <IconX size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-5xl">🪵</span>
              <p className="text-gray-1 text-sm">Seu carrinho está vazio.</p>
              <button onClick={closeCart} className="text-cta text-sm font-medium hover:underline">
                Ver produtos →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.productId}-${item.finish}`} className="flex gap-3 bg-bg rounded-[10px] p-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-3/20">
                  <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-nav truncate">{item.name}</p>
                  <p className="text-xs text-gray-2 mb-2">{item.finish}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 border border-[#E0DDD5] rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="px-2 py-1 text-gray-1 hover:bg-[#F1EFE8] transition-colors"
                      >
                        <IconMinus size={12} />
                      </button>
                      <span className="px-2 text-sm font-medium text-nav">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-2 py-1 text-gray-1 hover:bg-[#F1EFE8] transition-colors"
                      >
                        <IconPlus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-brown-dk">{formatBRL(item.price * item.quantity)}</span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-2 hover:text-red-500 transition-colors"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E8E6E0] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-1 text-sm">Subtotal</span>
              <span className="text-xl font-serif font-medium text-brown-dk">{formatBRL(total)}</span>
            </div>
            <button
              onClick={() => checkout()}
              className="w-full bg-whats text-white font-medium py-3.5 rounded-[10px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm"
            >
              <IconBrandWhatsapp size={18} />
              Garantir minha peça pelo WhatsApp
            </button>
            <p className="text-xs text-gray-2 text-center">
              Você será direcionado ao WhatsApp para confirmar seu pedido
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
