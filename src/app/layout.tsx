import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/ui/CartDrawer'

export const metadata: Metadata = {
  title: 'FFMA Marcenaria — Móveis Sob Medida em São Paulo',
  description: 'Marcenaria artesanal em São Paulo. Fabricamos móveis sob medida com madeira de qualidade e acabamento artesanal há mais de 15 anos.',
  keywords: 'marcenaria, móveis sob medida, São Paulo, móveis planejados, madeira maciça',
  openGraph: {
    title: 'FFMA Marcenaria — Móveis Sob Medida em São Paulo',
    description: 'Marcenaria artesanal em São Paulo. Móveis sob medida com madeira de qualidade.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
