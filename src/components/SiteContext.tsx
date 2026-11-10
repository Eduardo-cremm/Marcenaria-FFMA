"use client";

import { createContext, useCallback, useContext } from "react";
import type { Company } from "@/lib/company";
import { whatsUrl } from "@/lib/format";

const Ctx = createContext<Company | null>(null);

export function SiteProvider({ company, children }: { company: Company; children: React.ReactNode }) {
  return <Ctx.Provider value={company}>{children}</Ctx.Provider>;
}

/** Monta links do WhatsApp com o número salvo nas Configurações do admin. */
export function useWhats() {
  const c = useContext(Ctx);
  return useCallback((message: string) => whatsUrl(message, c?.whatsapp), [c?.whatsapp]);
}
