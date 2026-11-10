import Link from "next/link";
import { whatsUrl } from "@/lib/format";
import { getCompany } from "@/lib/company";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export async function Footer() {
  const c = await getCompany();
  return (
    <footer className="ft">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="text-cream">
          <Logo width={38} />
          <p className="mt-4 max-w-xs text-sage">Marcenaria sob medida em São Paulo há mais de 30 anos.</p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Rodapé">
          {site.nav.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-cream">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2">
          <a href={whatsUrl("Olá! Gostaria de um orçamento.", c.whatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
            WhatsApp {c.phoneLabel}
          </a>
          <a href={`mailto:${c.email}`} className="hover:text-cream">
            {c.email}
          </a>
          <span>{c.address}</span>
          <span>Seg a sex 8h–18h · Sáb 8h–13h</span>
        </div>
      </div>
      <p className="mt-12 border-t border-pine pt-6 text-[13px]">© {new Date().getFullYear()} Marcenaria FFMA. Todos os direitos reservados.</p>
    </footer>
  );
}

export async function WhatsFloat() {
  const c = await getCompany();
  return (
    <a
      href={whatsUrl("Olá! Vim pelo site e gostaria de um orçamento.", c.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-whats text-white shadow-[0_6px_20px_rgba(37,211,102,.4)] transition-transform hover:scale-110"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.17-3.07.8.82-3-.2-.3A8.1 8.1 0 0 1 12.04 3.8Zm-3.5 4.1c-.2 0-.5.07-.75.35-.26.28-.98.96-.98 2.34s1 2.72 1.15 2.9c.14.2 1.95 3.1 4.8 4.22 2.37.93 2.85.75 3.37.7.51-.05 1.66-.68 1.9-1.33.23-.66.23-1.22.16-1.34-.07-.11-.26-.18-.54-.32s-1.66-.82-1.92-.91c-.26-.1-.44-.14-.63.14-.19.28-.73.91-.9 1.1-.16.19-.33.21-.6.07-.29-.14-1.2-.44-2.28-1.4-.84-.76-1.41-1.69-1.58-1.97-.16-.28-.02-.43.13-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.13-.62-1.53-.87-2.1-.22-.5-.45-.5-.63-.51h-.51Z" />
      </svg>
    </a>
  );
}
