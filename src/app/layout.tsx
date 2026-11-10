import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Enquanto o site não é lançado, pede aos buscadores para não indexar.
// No lançamento, defina NEXT_PUBLIC_SITE_LIVE=1 na Vercel.
const live = process.env.NEXT_PUBLIC_SITE_LIVE === "1";

export const metadata: Metadata = {
  title: { default: "Marcenaria FFMA · Móveis sob medida em São Paulo", template: "%s · Marcenaria FFMA" },
  description: "Projetamos, produzimos e instalamos cozinhas, closets, salas e escritórios sob medida. Há mais de 30 anos em São Paulo.",
  robots: live ? undefined : { index: false, follow: false },
};

// Liga as animações antes da primeira pintura: .fx esconde o que vai entrar animado e
// .pre mostra a abertura na primeira visita à home. Se o JavaScript do site não iniciar, tudo volta a aparecer.
const boot = `(function(){var d=document.documentElement;if(location.pathname.indexOf('/admin')===0)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('fx');try{if(location.pathname==='/'&&!sessionStorage.getItem('ffma-intro')){d.classList.add('pre');sessionStorage.setItem('ffma-intro','1')}}catch(e){}setTimeout(function(){if(!window.__fx)d.classList.remove('pre','fx')},5000)})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
