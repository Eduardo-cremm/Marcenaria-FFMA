import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/client";
import { Blade } from "@/components/Logo";
import { hasSupabase } from "@/lib/supabase/config";

export const metadata: Metadata = { title: "Entrar · Admin", robots: { index: false, follow: false } };

export default function Login({ searchParams }: { searchParams: { erro?: string } }) {
  return (
    <div className="grid min-h-screen place-items-center bg-forest-deep px-4">
      <div className="w-full max-w-sm rounded-2xl bg-cream p-8 text-ink">
        <div className="mb-6 flex items-center gap-3 [&_path]:fill-forest">
          <Blade width={44} />
          <div>
            <b className="block font-serif text-xl font-medium">Marcenaria FFMA</b>
            <span className="text-xs uppercase tracking-widest text-muted">Painel admin</span>
          </div>
        </div>
        {!hasSupabase ? (
          <p className="text-sm text-muted">O painel ainda não está ligado ao banco de dados. Configure as variáveis do Supabase (veja o README) e publique de novo.</p>
        ) : (
          <>
            {searchParams.erro === "sem-acesso" && <p role="alert" className="mb-4 text-sm text-red-700">Este usuário não tem acesso ao painel.</p>}
            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
}
