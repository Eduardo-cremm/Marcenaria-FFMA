import { site } from "./site";
import { publicDb } from "./supabase/public";

export type Company = {
  whatsapp: string;
  phoneLabel: string;
  email: string;
  address: string;
  history: string;
  /** Razão social e CNPJ: exigidos pelo Decreto 7.962/2013 em sites que vendem. Vazios até serem preenchidos no admin. */
  legalName: string;
  cnpj: string;
};

export const companyDefaults: Company = {
  whatsapp: site.whatsapp,
  phoneLabel: site.phoneLabel,
  email: site.email,
  address: site.address,
  history: "",
  legalName: "",
  cnpj: "",
};

/** 12345678000190 → 12.345.678/0001-90 */
export function formatCnpj(v: string) {
  const d = v.replace(/\D/g, "");
  return d.length === 14 ? d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5") : v;
}

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
    legalName: data.legal_name || "",
    cnpj: data.cnpj ? formatCnpj(data.cnpj) : "",
  };
}
