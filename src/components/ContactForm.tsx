"use client";

import { useState } from "react";
import { saveQuote } from "@/app/(site)/contato/actions";
import { useWhats } from "./SiteContext";

const subjects = ["Orçamento de projeto", "Dúvida sobre produto", "Prazo de entrega", "Projeto personalizado", "Assistência técnica", "Outro"];

function phoneMask(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
}

// O formulário abre o WhatsApp com a mensagem pronta e, em paralelo,
// guarda o pedido no banco para a equipe acompanhar no /admin.
export function ContactForm() {
  const whats = useWhats();
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const info = [
      `Olá! Meu nome é ${get("nome")}.`,
      `Assunto: ${get("assunto")}`,
      get("cidade") && `Cidade: ${get("cidade")}`,
      get("email") && `E-mail: ${get("email")}`,
      phone && `Telefone: ${phone}`,
    ].filter(Boolean);
    // Abre o WhatsApp primeiro, ainda dentro do clique, para o navegador não bloquear a janela.
    window.open(whats([...info, "", get("mensagem")].join("\n")), "_blank", "noopener");
    void saveQuote({
      name: get("nome"), email: get("email"), phone, city: get("cidade"), subject: get("assunto"),
      message: get("mensagem"), consent: f.get("consent") === "on", website: get("website"),
    }).catch(() => {});
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-surface p-10 text-center" role="status">
        <h2 className="serif !mt-0 !text-4xl">Quase lá</h2>
        <p className="mx-auto mt-3 max-w-sm text-muted">Abrimos o WhatsApp com a sua mensagem pronta. É só enviar por lá para falar com a nossa equipe.</p>
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setSent(false)}>
          Escrever outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white/60 p-6 sm:p-9">
      <h2 className="serif !mt-0 !text-4xl">Envie uma mensagem</h2>
      <p className="mb-7 mt-2 text-muted">Ao enviar, abrimos o WhatsApp com a mensagem pronta.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="field"><label htmlFor="nome">Nome completo *</label><input id="nome" name="nome" required minLength={2} autoComplete="name" placeholder="Seu nome" /></div>
        <div className="field"><label htmlFor="tel">Telefone</label><input id="tel" name="telefone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="(11) 9 0000-0000" value={phone} onChange={(e) => setPhone(phoneMask(e.target.value))} /></div>
        <div className="field"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="email" placeholder="seu@email.com" /></div>
        <div className="field"><label htmlFor="cidade">Cidade</label><input id="cidade" name="cidade" placeholder="São Paulo" /></div>
        <div className="field sm:col-span-2">
          <label htmlFor="assunto">Assunto *</label>
          <select id="assunto" name="assunto" required defaultValue="">
            <option value="" disabled>Selecione o assunto…</option>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field sm:col-span-2"><label htmlFor="msg">Mensagem *</label><textarea id="msg" name="mensagem" required minLength={3} rows={5} placeholder="Descreva o ambiente, as medidas aproximadas e o que você imagina…" /></div>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="flex items-start gap-3 text-sm text-muted sm:col-span-2">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#B8913F]" />
          <span>Concordo que a Marcenaria FFMA use estes dados para responder ao meu contato.</span>
        </label>
      </div>
      <button type="submit" className="btn btn-brass mt-7 w-full">Enviar pelo WhatsApp</button>
    </form>
  );
}
