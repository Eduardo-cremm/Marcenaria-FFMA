import type { Metadata } from "next";
import Link from "next/link";
import { CompanyId, LegalPage } from "@/components/Legal";
import { getCompany } from "@/lib/company";
import { paymentMethods } from "@/lib/data";

export const metadata: Metadata = { title: "Termos de Uso e Compra" };

const toc = [
  { id: "empresa", label: "Quem vende" },
  { id: "como-funciona", label: "Como funciona a compra" },
  { id: "precos", label: "Preços e pagamento" },
  { id: "prazos", label: "Prazos, entrega e instalação" },
  { id: "arrependimento", label: "Direito de arrependimento" },
  { id: "sob-medida", label: "Móveis sob medida" },
  { id: "garantia", label: "Garantia e assistência" },
  { id: "atendimento", label: "Atendimento" },
  { id: "uso", label: "Uso do site" },
];

export default async function Termos() {
  const c = await getCompany();
  return (
    <LegalPage
      eyebrow="Termos"
      title="Termos de Uso e Compra"
      intro="As regras para comprar na nossa loja e contratar projetos sob medida, de acordo com o Código de Defesa do Consumidor e o Decreto 7.962/2013."
      toc={toc}
    >
      <h2 id="empresa">1. Quem vende</h2>
      <CompanyId c={c} />

      <h2 id="como-funciona">2. Como funciona a compra</h2>
      <ol>
        <li>Você escolhe os produtos na loja e os coloca no carrinho.</li>
        <li>Ao clicar em &quot;Finalizar pedido pelo WhatsApp&quot;, enviamos o resumo do pedido para a nossa equipe.</li>
        <li>Pelo WhatsApp, confirmamos com você a disponibilidade, o acabamento, o frete, a instalação, o valor final e a forma de pagamento.</li>
        <li>O pedido só é fechado depois que você aprova esse resumo final e faz o pagamento combinado. Enviamos a confirmação por escrito.</li>
      </ol>
      <p>Até essa confirmação, nada é cobrado e você pode desistir livremente.</p>

      <h2 id="precos">3. Preços e pagamento</h2>
      <ul>
        <li>Os preços do site estão em reais e valem para o produto no acabamento padrão, sem frete e sem instalação.</li>
        <li>Frete e instalação dependem do endereço e são informados antes do pagamento, junto com o valor total.</li>
        <li>Formas de pagamento: {paymentMethods.join(", ")}. Condições de parcelamento são informadas no atendimento.</li>
        <li>Podemos corrigir preços com erro evidente de digitação; nesse caso, avisamos antes de fechar o pedido e você decide se segue com a compra.</li>
      </ul>

      <h2 id="prazos">4. Prazos, entrega e instalação</h2>
      <ul>
        <li>O prazo de produção de cada produto aparece na página dele, em dias úteis contados a partir da confirmação do pagamento.</li>
        <li>Produtos de pronta entrega saem conforme a agenda combinada no atendimento.</li>
        <li>Atendemos a Grande São Paulo e o interior do estado. Para outras regiões, avaliamos o frete caso a caso.</li>
        <li>Na entrega, confira o móvel na presença da nossa equipe ou da transportadora e anote qualquer avaria no comprovante.</li>
      </ul>

      <h2 id="arrependimento">5. Direito de arrependimento</h2>
      <p>
        Nas compras feitas pela internet ou pelo WhatsApp, você pode desistir em até <b>7 dias corridos</b> a partir do recebimento do produto, sem precisar
        explicar o motivo (art. 49 do Código de Defesa do Consumidor).
      </p>
      <ul>
        <li>Para desistir, avise pelo WhatsApp {c.phoneLabel} ou pelo e-mail <a href={`mailto:${c.email}`}>{c.email}</a>. Confirmamos o recebimento do pedido de imediato.</li>
        <li>Combinamos a retirada do produto sem custo para você. Pedimos que ele esteja sem uso e, se possível, na embalagem.</li>
        <li>Devolvemos todo o valor pago, incluindo o frete, pelo mesmo meio de pagamento. Em compras no cartão, pedimos o estorno à operadora logo após o aviso.</li>
      </ul>

      <h2 id="sob-medida">6. Móveis sob medida</h2>
      <p>
        Projetos sob medida são contratados à parte, depois da visita técnica e da aprovação do projeto. O orçamento aprovado descreve medidas, materiais,
        acabamentos, valor, forma de pagamento, prazo de produção e instalação, e as condições de cancelamento em cada etapa. Ele é enviado por escrito
        antes de qualquer pagamento.
      </p>

      <h2 id="garantia">7. Garantia e assistência</h2>
      <ul>
        <li>Todos os móveis têm a garantia legal de 90 dias contra vícios (art. 26 do CDC).</li>
        <li>Além dela, oferecemos garantia de 1 ano contra defeitos de fabricação, que se soma à garantia legal (art. 50 do CDC).</li>
        <li>A garantia não cobre desgaste natural, mau uso, umidade excessiva, montagem ou mudança feita por terceiros e exposição direta ao sol ou à água.</li>
        <li>Para acionar, mande fotos e a descrição do problema pelo WhatsApp ou e-mail. Agendamos a visita de assistência.</li>
      </ul>

      <h2 id="atendimento">8. Atendimento</h2>
      <p>
        Dúvidas, reclamações, trocas e cancelamentos: WhatsApp {c.phoneLabel} ou <a href={`mailto:${c.email}`}>{c.email}</a>, de segunda a sexta das 8h às
        18h e aos sábados das 8h às 13h. Respondemos em até 5 dias úteis.
      </p>

      <h2 id="uso">9. Uso do site</h2>
      <ul>
        <li>Fotos de projetos mostram trabalhos já entregues e servem de referência; cada peça de madeira tem veios e tons próprios.</li>
        <li>Textos, fotos e marca são da Marcenaria FFMA e não podem ser copiados para fins comerciais sem autorização.</li>
        <li>O tratamento dos seus dados segue a nossa <Link href="/privacidade">Política de Privacidade</Link>.</li>
        <li>Estes termos seguem as leis brasileiras. Eventuais disputas podem ser levadas ao foro do seu domicílio.</li>
      </ul>
    </LegalPage>
  );
}
