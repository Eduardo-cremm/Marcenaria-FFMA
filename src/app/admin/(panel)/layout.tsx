import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NavLinks } from "@/components/admin/client";
import { Blade } from "@/components/Logo";
import { hasSupabase } from "@/lib/supabase/config";
import { serverDb } from "@/lib/supabase/server";
import { signOut } from "../actions";

export const metadata: Metadata = { title: { default: "Admin", template: "%s · Admin FFMA" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!hasSupabase) redirect("/admin/login");
  const db = serverDb();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: ok } = await db.rpc("is_admin");
  if (!ok) redirect("/admin/login?erro=sem-acesso");

  const { count: novos } = await db.from("quotes").select("*", { count: "exact", head: true }).eq("status", "novo");
  const nav = [
    { href: "/admin", label: "Resumo" },
    { href: "/admin/produtos", label: "Produtos" },
    { href: "/admin/projetos", label: "Projetos" },
    { href: "/admin/orcamentos", label: "Orçamentos", badge: novos ?? 0 },
    { href: "/admin/configuracoes", label: "Configurações" },
  ];

  return (
    <div className="min-h-screen bg-cream text-ink md:pl-60">
      <aside className="bg-forest-deep text-cream md:fixed md:inset-y-0 md:left-0 md:flex md:w-60 md:flex-col">
        <div className="flex items-center gap-3 border-b border-pine px-5 py-5 [&_path]:fill-cream">
          <Blade width={36} />
          <div>
            <b className="block font-serif text-lg font-medium leading-tight">FFMA</b>
            <span className="text-[10px] uppercase tracking-widest text-sage">Painel admin</span>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto p-3 md:flex-1 md:flex-col" aria-label="Painel">
          <NavLinks items={nav} />
        </nav>
        <div className="border-t border-pine p-4 text-sm">
          <p className="truncate text-sage" title={user.email ?? ""}>{user.email}</p>
          <div className="mt-2 flex gap-4 font-semibold">
            <Link href="/" target="_blank" className="underline">Ver site</Link>
            <form action={signOut}><button type="submit" className="underline">Sair</button></form>
          </div>
        </div>
      </aside>
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-10">{children}</div>
    </div>
  );
}
