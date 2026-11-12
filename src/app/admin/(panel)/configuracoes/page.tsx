import type { Metadata } from "next";
import { saveCompany } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/client";
import { Field, inputCls, Notice, PageTitle } from "@/components/admin/ui";
import { companyDefaults } from "@/lib/company";
import { serverDb } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Configurações" };

export default async function Configuracoes({ searchParams }: { searchParams: { ok?: string; erro?: string } }) {
  const { data: c } = await serverDb().from("company_info").select("*").eq("id", 1).maybeSingle();

  return (
    <>
      <PageTitle title="Configurações" />
      <Notice params={searchParams} />
      <form action={saveCompany} className="grid gap-5 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2">
        <Field label="WhatsApp que recebe os pedidos" hint={`DDI + DDD + número, só dígitos. Ex.: 5511912345678. Vazio usa o padrão (${companyDefaults.whatsapp}).`}>
          <input name="whatsapp_number" inputMode="numeric" defaultValue={c?.whatsapp_number ?? ""} className={inputCls} />
        </Field>
        <Field label="Telefone como aparece no site" hint="Ex.: (11) 9 1234-5678">
          <input name="phone_label" defaultValue={c?.phone_label ?? ""} className={inputCls} />
        </Field>
        <Field label="E-mail de contato"><input name="contact_email" type="email" defaultValue={c?.contact_email ?? ""} className={inputCls} /></Field>
        <Field label="Endereço completo" hint="Rua, número, bairro, cidade, UF e CEP. Aparece no rodapé e nos Termos."><input name="address" defaultValue={c?.address ?? ""} className={inputCls} /></Field>
        <Field label="Razão social" hint="Obrigatória por lei em sites que vendem (Decreto 7.962/2013).">
          <input name="legal_name" defaultValue={c?.legal_name ?? ""} className={inputCls} />
        </Field>
        <Field label="CNPJ" hint="Só os números ou no formato 00.000.000/0000-00.">
          <input name="cnpj" inputMode="numeric" defaultValue={c?.cnpj ?? ""} className={inputCls} />
        </Field>
        <Field label="História da empresa" hint="Texto da página Sobre. Separe os parágrafos com uma linha em branco." className="sm:col-span-2">
          <textarea name="history_text" rows={8} defaultValue={c?.history_text ?? ""} className={inputCls} />
        </Field>
        <div className="sm:col-span-2"><SubmitButton>Salvar</SubmitButton></div>
      </form>
    </>
  );
}
