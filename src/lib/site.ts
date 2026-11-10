// Dados gerais da empresa. Os valores marcados como PROVISÓRIO precisam ser trocados pelos reais.
export const site = {
  name: "Marcenaria FFMA",
  tagline: "Marcenaria sob medida em São Paulo",
  // PROVISÓRIO: número do WhatsApp com DDI e DDD, só dígitos.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511999999999",
  phoneLabel: "(11) 9 XXXX-XXXX", // PROVISÓRIO
  email: "contato@ffma.com.br", // PROVISÓRIO
  address: "Rua das Madeiras, 123 · São Paulo, SP", // PROVISÓRIO
  hours: [
    { day: "Segunda a sexta", time: "8h às 18h" },
    { day: "Sábado", time: "8h às 13h" },
    { day: "Domingo", time: "Fechado" },
  ],
  nav: [
    { href: "/projetos", label: "Projetos" },
    { href: "/sob-medida", label: "Sob medida" },
    { href: "/loja", label: "Loja" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
  ],
};

export const processSteps = [
  { title: "Conversa", text: "Você conta o que precisa pelo WhatsApp ou pelo formulário." },
  { title: "Visita", text: "Medimos o espaço e entendemos o uso do ambiente." },
  { title: "Projeto", text: "Desenho, materiais e orçamento fechado para aprovar." },
  { title: "Produção", text: "Fabricamos no nosso ateliê, peça por peça." },
  { title: "Instalação", text: "Nossa equipe entrega e monta na sua casa." },
];

export const faq = [
  { q: "Vocês atendem fora de São Paulo?", a: "Atendemos a Grande São Paulo e o interior do estado. Para cidades mais distantes, avaliamos logística e frete caso a caso." },
  { q: "Qual é o prazo de produção?", a: "Em média de 20 a 45 dias úteis, conforme a complexidade e o acabamento. O prazo exato vai no orçamento." },
  { q: "Posso personalizar cor e acabamento?", a: "Sim. Medidas, cor, acabamento e detalhes de desenho são definidos com você no projeto." },
  { q: "Como funciona o pagamento?", a: "50% na confirmação do pedido e 50% na entrega. Aceitamos PIX, transferência e cartão de crédito por link de pagamento." },
  { q: "Vocês fazem visita técnica?", a: "Para cozinhas, closets e ambientes completos, fazemos visita técnica sem custo para medir o espaço antes do orçamento." },
  { q: "Qual a garantia dos móveis?", a: "Um ano contra defeitos de fabricação." },
];
