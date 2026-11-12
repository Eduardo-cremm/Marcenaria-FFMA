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
      <div className="mt-12 flex flex-col gap-3 border-t border-pine pt-6 text-[13px] md:flex-row md:items-start md:justify-between">
        <p>
          © {new Date().getFullYear()} Marcenaria FFMA
          {c.legalName && c.legalName !== "Marcenaria FFMA" && <> · {c.legalName}</>}
          {c.cnpj && <> · CNPJ {c.cnpj}</>}
          <br />
          {c.address}
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Informações legais">
          <Link href="/privacidade" className="hover:text-cream">Política de Privacidade</Link>
          <Link href="/termos" className="hover:text-cream">Termos de Uso e Compra</Link>
          <Link href="/termos#arrependimento" className="hover:text-cream">Trocas e devoluções</Link>
        </nav>
      </div>
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
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 sm:bottom-6 sm:right-6 place-items-center rounded-full bg-whats text-white shadow-[0_6px_20px_rgba(37,211,102,.4)] transition-transform hover:scale-110"
    >
      {/* glifo oficial do WhatsApp (24×24), centralizado no círculo */}
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="block">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}
