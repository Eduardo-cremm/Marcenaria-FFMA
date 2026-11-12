-- Razão social e CNPJ da empresa (rodapé, Termos e Política de Privacidade).
-- Rode uma vez no SQL Editor do Supabase. É seguro rodar de novo.
alter table company_info add column if not exists legal_name text;
alter table company_info add column if not exists cnpj text;
