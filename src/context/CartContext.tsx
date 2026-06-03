'use client'

import { createContext, useContext, useEffect, useReducer } from 'react'
import { CartItem } from '@/types'
import { buildWhatsAppUrl } from '@/lib/utils'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_DRAWER'; open?: boolean }

interface CartContext extends CartState {
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  total: number
  itemCount: number
  checkout: (user?: { name: string; city: string } | null) => void
}

const CartCtx = createContext<CartContext | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.productId === action.item.productId && i.finish === action.item.finish)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === action.item.productId && i.finish === action.item.finish
              ? { ...i, quantity: i.quantity + action.item.quantity }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, action.item] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.productId !== action.productId) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.productId ? { ...i, quantity: Math.max(1, action.qty) } : i
        ),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_DRAWER':
      return { ...state, isOpen: action.open !== undefined ? action.open : !state.isOpen }
    default:
      return state
  }
}

function formatBRL(v: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v)
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  // Persiste no localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ffma-cart')
    if (saved) {
      const items: CartItem[] = JSON.parse(saved)
      items.forEach(item => dispatch({ type: 'ADD', item }))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('ffma-cart', JSON.stringify(state.items))
  }, [state.items])

  const total = state.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const itemCount = state.items.reduce((s, i) => s + i.quantity, 0)

  function checkout(user?: { name: string; city: string } | null) {
    const name = user?.name || 'Cliente'
    const city = user?.city || ''
    const itemLines = state.items
      .map(i => `• ${i.name} — ${i.finish} — ${formatBRL(i.price)} (${i.quantity}x)`)
      .join('\n')
    const msg =
      `Olá! Meu nome é ${name}${city ? `, de ${city}` : ''}.\n` +
      `Gostaria de garantir os seguintes itens:\n\n${itemLines}\n\n` +
      `Total: ${formatBRL(total)}\n\nAguardo confirmação de disponibilidade e prazo. Obrigado!`
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'
    window.open(buildWhatsAppUrl(phone, msg), '_blank')
  }

  return (
    <CartCtx.Provider
      value={{
        ...state,
        total,
        itemCount,
        addToCart: (item) => dispatch({ type: 'ADD', item }),
        removeFromCart: (id) => dispatch({ type: 'REMOVE', productId: id }),
        updateQuantity: (id, qty) => dispatch({ type: 'UPDATE_QTY', productId: id, qty }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        openCart: () => dispatch({ type: 'TOGGLE_DRAWER', open: true }),
        closeCart: () => dispatch({ type: 'TOGGLE_DRAWER', open: false }),
        checkout,
      }}
    >
      {children}
    </CartCtx.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
