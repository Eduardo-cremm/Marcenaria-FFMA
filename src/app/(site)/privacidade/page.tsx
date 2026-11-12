import type { Metadata } from "next";
import Link from "next/link";
import { CompanyId, LegalPage } from "@/components/Legal";
import { getCompany } from "@/lib/company";

export const metadata: Metadata = { title: "Política de Privacidade" };

const toc = [
  { id: "quem-somos", label: "Quem é o responsável" },
  { id: "dados", label: "Quais dados coletamos" },
  { id: "finalidades", label: "Para que usamos" },
  { id: "compartilhamento", label: "Com quem compartilhamos" },
  { id: "prazo", label: "Por quanto tempo guardamos" },
  { id: "direitos", label: "Seus direitos" },
  { id: "cookies", label: "Cookies e armazenamento" },
  { id: "seguranca", label: "Segurança" },
  { id: "alteracoes", label: "Alterações" },
];

export default async function Privacidade() {
  const c = await getCompany();
  return (
    <LegalPage
      eyebrow="LGPD"
      title="Política de Privacidade"
      intro="Como tratamos os seus dados pessoais, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018)."
      toc={toc}
    >
      <h2 id="quem-somos">1. Quem é o responsável pelos seus dados</h2>
      <p>O controlador dos dados tratados neste site é:</p>
      <CompanyId c={c} />
      <p>
        Para qualquer assunto sobre os seus dados, fale com o nosso encarregado pelo e-mail <a href={`mailto:${c.email}`}>{c.email}</a>, com o assunto
        &quot;Privacidade&quot;.
      </p>

      <h2 id="dados">2. Quais dados coletamos</h2>
      <p>Coletamos apenas o que você mesmo nos envia:</p>
      <ul>
        <li><b>Formulário de contato:</b> nome, telefone, e-mail, cidade, assunto e a mensagem que você escrever. Telefone, e-mail e cidade são opcionais.</li>
        <li><b>Conversa pelo WhatsApp:</b> o que você nos mandar por lá, incluindo o pedido montado no carrinho, endereço de entrega e dados para emissão de nota fiscal quando houver compra.</li>
        <li><b>Carrinho:</b> os itens escolhidos ficam guardados só no seu navegador, não no nosso servidor.</li>
      </ul>
      <p>Não usamos ferramentas de publicidade, de análise de audiência ou de rastreamento, e não compramos dados de terceiros.</p>

      <h2 id="finalidades">3. Para que usamos e com qual base legal</h2>
      <ul>
        <li><b>Responder ao seu contato e preparar orçamentos:</b> com base no seu consentimento, dado ao marcar a caixa do formulário (art. 7º, I), e em procedimentos preliminares a um contrato que você pediu (art. 7º, V).</li>
        <li><b>Vender, entregar, instalar e prestar garantia:</b> para executar o contrato de compra (art. 7º, V).</li>
        <li><b>Emitir notas fiscais e guardar registros exigidos por lei:</b> para cumprir obrigações legais e fiscais (art. 7º, II).</li>
        <li><b>Defender direitos em eventual processo:</b> exercício regular de direitos (art. 7º, VI).</li>
      </ul>
      <p>Não usamos os seus dados para enviar propaganda sem o seu pedido.</p>

      <h2 id="compartilhamento">4. Com quem compartilhamos</h2>
      <p>Não vendemos nem cedemos os seus dados. Eles passam apenas pelos serviços que fazem o site funcionar:</p>
      <ul>
        <li><b>Supabase:</b> banco de dados onde ficam os pedidos de orçamento enviados pelo formulário.</li>
        <li><b>Vercel:</b> hospedagem do site.</li>
        <li><b>WhatsApp (Meta):</b> quando você escolhe falar conosco por lá, a conversa segue a política de privacidade do próprio WhatsApp.</li>
        <li><b>Transportadoras e contabilidade:</b> só os dados necessários para entregar o pedido e emitir a nota fiscal, quando houver compra.</li>
      </ul>
      <p>
        Alguns desses fornecedores podem guardar dados em servidores fora do Brasil. Nesses casos a transferência segue o art. 33 da LGPD, com fornecedores que
        adotam garantias de proteção compatíveis com a lei brasileira.
      </p>

      <h2 id="prazo">5. Por quanto tempo guardamos</h2>
      <ul>
        <li><b>Pedidos de orçamento que não viraram compra:</b> até 12 meses após o último contato. Depois disso, são excluídos.</li>
        <li><b>Dados de clientes:</b> pelo prazo da garantia e pelos prazos exigidos pela legislação fiscal e de defesa do consumidor (em geral, 5 anos).</li>
      </ul>
      <p>Você pode pedir a exclusão antes disso, exceto dos dados que a lei nos obriga a manter.</p>

      <h2 id="direitos">6. Seus direitos</h2>
      <p>Pelo art. 18 da LGPD, você pode, a qualquer momento e sem custo:</p>
      <ul>
        <li>confirmar se tratamos dados seus e ter acesso a eles;</li>
        <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
        <li>pedir a anonimização, o bloqueio ou a exclusão de dados desnecessários ou tratados em desacordo com a lei;</li>
        <li>pedir a portabilidade dos dados para outro fornecedor;</li>
        <li>saber com quem compartilhamos os seus dados;</li>
        <li>revogar o consentimento e pedir a exclusão dos dados tratados com base nele.</li>
      </ul>
      <p>
        Para exercer qualquer um deles, escreva para <a href={`mailto:${c.email}`}>{c.email}</a>. Respondemos em até 15 dias. Se não ficar satisfeito, você
        também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD), em gov.br/anpd.
      </p>

      <h2 id="cookies">7. Cookies e armazenamento no navegador</h2>
      <p>O site usa apenas recursos essenciais para funcionar. Nenhum deles serve para publicidade ou para seguir você em outros sites:</p>
      <ul>
        <li><b>ffma-cart</b> (armazenamento local): guarda os itens do carrinho no seu navegador até você esvaziá-lo.</li>
        <li><b>ffma-intro</b> (armazenamento da sessão): evita repetir a animação de abertura; some ao fechar o navegador.</li>
        <li><b>ffma-cookies</b> (armazenamento local): lembra que você já viu o aviso de cookies.</li>
        <li><b>Cookies de login do painel</b>: usados só na área administrativa da equipe, nunca para visitantes.</li>
      </ul>
      <p>Por serem necessários ao funcionamento, esses recursos não dependem de consentimento. Você pode apagá-los a qualquer momento nas configurações do navegador; o carrinho será esvaziado.</p>

      <h2 id="seguranca">8. Segurança</h2>
      <p>
        O site usa conexão criptografada (HTTPS). Os pedidos de orçamento ficam em banco de dados com acesso restrito à equipe da marcenaria, protegido por
        senha. Se ocorrer um incidente de segurança que possa causar risco ou dano relevante, avisaremos os titulares afetados e a ANPD, como manda a lei.
      </p>

      <h2 id="alteracoes">9. Alterações desta política</h2>
      <p>
        Podemos atualizar esta política para refletir mudanças no site ou na lei. A data da última atualização fica no fim da página. Veja também os nossos{" "}
        <Link href="/termos">Termos de Uso e Compra</Link>.
      </p>
    </LegalPage>
  );
}
