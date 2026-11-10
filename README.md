# Marcenaria FFMA

Site da Marcenaria FFMA: apresentação do serviço sob medida, portfólio de projetos, loja com pedido pelo WhatsApp e painel administrativo.

Next.js 14 (App Router) · Tailwind CSS · GSAP + Lenis · Supabase (banco, login e fotos) · Vercel.

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sem as variáveis do Supabase o site funciona com o conteúdo de exemplo de `src/lib/data.ts` e o `/admin` fica desligado.

## Ligar o Supabase (uma vez)

1. Crie um projeto em supabase.com.
2. Em **SQL Editor**, cole e rode o conteúdo de `supabase/schema.sql`.
3. Em **Authentication > Users**, crie o usuário que vai administrar o site (e-mail e senha).
4. No **SQL Editor**, libere esse usuário como admin:
   ```sql
   insert into admins (user_id) select id from auth.users where email = 'SEU_EMAIL';
   ```
5. Em **Authentication > Sign In / Providers**, desligue "Allow new users to sign up".
6. Copie a **Project URL** e a chave **anon public** (Project Settings > API) para `.env.local` e para as variáveis de ambiente da Vercel, e publique de novo.

## Painel admin (`/admin`)

- **Resumo:** contadores e últimos orçamentos.
- **Produtos e Projetos:** cadastro, fotos (reduzidas no navegador antes do envio, a primeira é a capa), publicar/ocultar e destaque na home.
- **Orçamentos:** mensagens do formulário de contato, com resposta pelo WhatsApp e marcação de respondido.
- **Configurações:** WhatsApp que recebe os pedidos, telefone, e-mail, endereço e o texto da página Sobre.

O acesso é protegido em três camadas: middleware (sessão), layout do painel (lista `admins`) e políticas RLS no banco.

## Estrutura

```
src/app/(site)   páginas públicas
src/app/admin    painel e ações do servidor
src/components   componentes e animações
src/lib          dados, formatação e clientes do Supabase
supabase         schema do banco
mockups          protótipos de referência
```
