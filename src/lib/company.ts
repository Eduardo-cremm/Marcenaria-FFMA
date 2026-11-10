import { site } from "./site";
import { publicDb } from "./supabase/public";

export type Company = { whatsapp: string; phoneLabel: string; email: string; address: string; history: string };

export const companyDefaults: Company = {
  whatsapp: site.whatsapp,
  phoneLabel: site.phoneLabel,
  email: site.email,
  address: site.address,
  history: "",
};

/** Dados de contato: o que estiver salvo em Configurações do admin vale sobre os padrões de site.ts. */
export async function getCompany(): Promise<Company> {
  const db = publicDb();
  if (!db) return companyDefaults;
  const { data } = await db.from("company_info").select("*").eq("id", 1).maybeSingle();
  if (!data) return companyDefaults;
  return {
    whatsapp: (data.whatsapp_number || "").replace(/\D/g, "") || companyDefaults.whatsapp,
    phoneLabel: data.phone_label || companyDefaults.phoneLabel,
    email: data.contact_email || companyDefaults.email,
    address: data.address || companyDefaults.address,
    history: data.history_text || "",
  };
}
