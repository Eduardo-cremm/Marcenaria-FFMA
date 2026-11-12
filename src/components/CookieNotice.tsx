"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "ffma-cookies";

/**
 * Aviso informativo: o site só usa armazenamento essencial (carrinho e animação de abertura),
 * que não depende de consentimento pela LGPD. Se um dia entrar analytics ou pixel de anúncio,
 * este aviso precisa virar um pedido de consentimento com "Aceitar" e "Recusar".
 */
export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {}
  }, []);

  if (!show) return null;

  const close = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed bottom-5 left-4 right-[88px] z-[70] rounded-xl bg-forest-deep p-4 text-sm text-cream shadow-[0_12px_40px_rgba(0,0,0,.35)] sm:left-6 sm:right-auto sm:max-w-[400px] sm:p-5"
    >
      <p className="text-sage">
        Usamos apenas o armazenamento essencial para o carrinho funcionar. Nada de cookies de publicidade ou rastreamento.{" "}
        <Link href="/privacidade#cookies" className="font-semibold text-cream underline">Saiba mais</Link>
      </p>
      <button type="button" onClick={close} className="btn btn-brass btn-sm mt-3">
        Entendi
      </button>
    </div>
  );
}
