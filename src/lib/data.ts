// Com o Supabase configurado, o site lê os produtos e projetos do banco (cadastrados no /admin).
// Sem ele, usa o conteúdo de exemplo abaixo.
import { publicDb } from "./supabase/public";

export type Tone = "a" | "b" | "c" | "d" | "e" | "f";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  detail: string;
  price: number;
  description: string;
  finishes: string[];
  leadTime: string;
  inStock: boolean;
  badge?: "Destaque" | "Novo";
  featured?: boolean;
  tone: Tone;
  images?: string[];
};

export type Project = {
  slug: string;
  title: string;
  room: string;
  city: string;
  date: string;
  year: number;
  material: string;
  leadTime: string;
  description: string;
  featured?: boolean;
  tone: Tone;
  images?: string[];
};

export type Service = { slug: string; title: string; text: string; room?: string; tone: Tone };

export const rooms = ["Sala", "Quarto", "Cozinha", "Escritório", "Banheiro"];
export const categories = ["Sala de Estar", "Quarto", "Cozinha", "Escritório", "Banheiro"];
export const paymentMethods = ["PIX", "Cartão de crédito", "Transferência"];

const finishes = ["Natural", "Escuro", "Pintado"];

export const services: Service[] = [
  { slug: "cozinhas", title: "Cozinhas", text: "Armários, bancadas, ilhas e despensas planejadas.", room: "Cozinha", tone: "a" },
  { slug: "closets-e-quartos", title: "Closets e quartos", text: "Guarda-roupas, cabeceiras, cômodas e closets completos.", room: "Quarto", tone: "c" },
  { slug: "salas-e-paineis", title: "Salas e painéis", text: "Estantes, racks, painéis ripados e mesas de jantar.", room: "Sala", tone: "d" },
  { slug: "escritorios", title: "Escritórios", text: "Home office e ambientes corporativos.", room: "Escritório", tone: "f" },
];

const products: Product[] = [
  { id: "mj-001", slug: "mesa-de-jantar-carvalho", name: "Mesa de Jantar Carvalho", category: "Sala de Estar", detail: "6 lugares", price: 3800, description: "Mesa de jantar em carvalho maciço para seis pessoas, com tampo de 4 cm e acabamento em verniz fosco.", finishes, leadTime: "25 dias úteis", inStock: false, badge: "Destaque", featured: true, tone: "a" },
  { id: "cb-002", slug: "cama-box-queen-cabeceira", name: "Cama Box Queen + Cabeceira", category: "Quarto", detail: "Queen", price: 4500, description: "Base box queen com cabeceira em madeira, pronta para receber colchão de 158 × 198 cm.", finishes, leadTime: "30 dias úteis", inStock: false, tone: "c" },
  { id: "em-003", slug: "estante-modular-carvalho", name: "Estante Modular Carvalho", category: "Sala de Estar", detail: "180 cm", price: 2100, description: "Estante modular com prateleiras reguláveis. Os módulos podem ser combinados lado a lado.", finishes, leadTime: "20 dias úteis", inStock: true, badge: "Novo", featured: true, tone: "c" },
  { id: "ac-004", slug: "armario-closet-mdf-branco", name: "Armário Closet MDF Branco", category: "Quarto", detail: "240 cm", price: 6200, description: "Closet em MDF branco com cabideiros, gaveteiro e sapateira, com 240 cm de altura.", finishes: ["Branco", "Pintado"], leadTime: "35 dias úteis", inStock: false, tone: "f" },
  { id: "rt-005", slug: "rack-tv-industrial", name: "Rack TV Industrial", category: "Sala de Estar", detail: "180 cm", price: 1750, description: "Rack de 180 cm em madeira com estrutura metálica, para TVs de até 75 polegadas.", finishes, leadTime: "15 dias úteis", inStock: true, featured: true, tone: "d" },
  { id: "gb-006", slug: "gabinete-banheiro-espelho", name: "Gabinete de Banheiro com Espelho", category: "Banheiro", detail: "80 cm", price: 1200, description: "Gabinete suspenso de 80 cm com espelho, em material resistente à umidade.", finishes: ["Natural", "Branco"], leadTime: "20 dias úteis", inStock: true, tone: "e" },
  { id: "cj-007", slug: "cadeira-jantar-madeira-macica", name: "Cadeira de Jantar Madeira Maciça", category: "Sala de Estar", detail: "por unidade", price: 480, description: "Cadeira de jantar em madeira maciça com assento anatômico. Preço por unidade.", finishes, leadTime: "15 dias úteis", inStock: true, tone: "b" },
  { id: "me-008", slug: "mesa-home-office", name: "Mesa Home Office", category: "Escritório", detail: "150 cm", price: 1900, description: "Mesa de trabalho de 150 cm com passagem de cabos e gaveta embutida.", finishes, leadTime: "20 dias úteis", inStock: true, badge: "Destaque", featured: true, tone: "f" },
  { id: "bc-009", slug: "bancada-cozinha-freijo", name: "Bancada de Cozinha Freijó", category: "Cozinha", detail: "120 cm", price: 2400, description: "Bancada de apoio em freijó com prateleira inferior, para cozinhas e áreas gourmet.", finishes, leadTime: "25 dias úteis", inStock: false, tone: "d" },
];

const projects: Project[] = [
  { slug: "sala-familia-rodrigues", title: "Sala completa, família Rodrigues", room: "Sala", city: "São Paulo", date: "Nov 2024", year: 2024, material: "Carvalho maciço", leadTime: "45 dias úteis", description: "Sala de estar completa, com mesa de centro em carvalho maciço, estante modular, rack de TV e mesa de jantar para seis pessoas. Acabamento natural em verniz fosco.", featured: true, tone: "d" },
  { slug: "suite-master-higienopolis", title: "Suíte master", room: "Quarto", city: "Higienópolis", date: "Out 2024", year: 2024, material: "Freijó e MDF", leadTime: "40 dias úteis", description: "Cabeceira de parede inteira, criados-mudos suspensos e armário com portas de correr.", featured: true, tone: "c" },
  { slug: "cozinha-casa-granja", title: "Cozinha planejada", room: "Cozinha", city: "Campinas", date: "Set 2024", year: 2024, material: "MDF e freijó", leadTime: "45 dias úteis", description: "Cozinha planejada com ilha, torre quente e despensa embutida.", featured: true, tone: "e" },
  { slug: "home-office-vila-madalena", title: "Home office", room: "Escritório", city: "Vila Madalena", date: "Ago 2024", year: 2024, material: "Carvalho", leadTime: "25 dias úteis", description: "Bancada de trabalho para duas pessoas, com estante de parede e armário baixo.", featured: true, tone: "f" },
  { slug: "gabinete-banheiro-perdizes", title: "Gabinete de banheiro", room: "Banheiro", city: "Perdizes", date: "Jul 2024", year: 2024, material: "MDF naval", leadTime: "20 dias úteis", description: "Gabinete suspenso com duas cubas e armário de espelho.", tone: "a" },
  { slug: "closet-morumbi", title: "Closet planejado", room: "Quarto", city: "Morumbi", date: "Jun 2024", year: 2024, material: "MDF", leadTime: "35 dias úteis", description: "Closet em U com ilha central de gavetas e iluminação embutida.", featured: true, tone: "b" },
  { slug: "estante-pinheiros", title: "Estante de livros", room: "Sala", city: "Pinheiros", date: "Mai 2024", year: 2024, material: "Carvalho", leadTime: "30 dias úteis", description: "Estante do piso ao teto com escada de correr.", featured: true, tone: "a" },
  { slug: "mesa-cadeiras-lapa", title: "Mesa e seis cadeiras", room: "Cozinha", city: "Lapa", date: "Abr 2024", year: 2024, material: "Madeira maciça", leadTime: "30 dias úteis", description: "Conjunto de mesa e seis cadeiras em madeira maciça para copa.", tone: "d" },
];

// ───────── Leitura do Supabase (quando configurado) ─────────

type PhotoRow = { url: string; display_order: number };
export type ProductRow = {
  id: string; name: string; slug: string; category: string | null; detail: string | null; description: string | null;
  price: number | string; finishes: string[] | null; lead_time: string | null; in_stock: boolean | null; badge: string | null;
  is_featured: boolean | null; is_available: boolean | null; display_order: number | null; product_photos?: PhotoRow[];
};
export type ProjectRow = {
  id: string; title: string; slug: string; room: string | null; city: string | null; completed_at: string | null;
  material: string | null; lead_time: string | null; description: string | null; is_featured: boolean | null;
  is_published: boolean | null; display_order: number | null; project_photos?: PhotoRow[];
};

const urls = (rows?: PhotoRow[]) => [...(rows ?? [])].sort((a, b) => a.display_order - b.display_order).map((r) => r.url);

// Tom do bloco provisório, fixo por item, para quando ainda não há foto.
function toneOf(id: string): Tone {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return "abcdef"[h % 6] as Tone;
}

const toProduct = (r: ProductRow): Product => ({
  id: r.id, slug: r.slug, name: r.name, category: r.category ?? "", detail: r.detail ?? "", price: Number(r.price),
  description: r.description ?? "", finishes: r.finishes ?? [], leadTime: r.lead_time ?? "", inStock: !!r.in_stock,
  badge: r.badge === "Destaque" || r.badge === "Novo" ? r.badge : undefined, featured: !!r.is_featured,
  tone: toneOf(r.id), images: urls(r.product_photos),
});

function toProject(r: ProjectRow): Project {
  const d = r.completed_at ? new Date(r.completed_at + "T12:00:00") : null;
  return {
    slug: r.slug, title: r.title, room: r.room ?? "", city: r.city ?? "",
    date: d ? d.toLocaleDateString("pt-BR", { month: "short", year: "numeric" }) : "",
    year: d ? d.getFullYear() : 0, material: r.material ?? "", leadTime: r.lead_time ?? "",
    description: r.description ?? "", featured: !!r.is_featured, tone: toneOf(r.id), images: urls(r.project_photos),
  };
}

export async function getProducts(): Promise<Product[]> {
  const db = publicDb();
  if (!db) return products;
  const { data, error } = await db
    .from("products")
    .select("*, product_photos(url, display_order)")
    .eq("is_available", true)
    .order("display_order")
    .order("created_at", { ascending: false });
  if (error) throw new Error("Falha ao ler produtos: " + error.message);
  // Enquanto nada foi cadastrado no admin, mostra o conteúdo de exemplo.
  if (!data.length) return products;
  return (data as ProductRow[]).map(toProduct);
}
export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}
export async function getProjects(): Promise<Project[]> {
  const db = publicDb();
  if (!db) return projects;
  const { data, error } = await db
    .from("projects")
    .select("*, project_photos(url, display_order)")
    .eq("is_published", true)
    .order("display_order")
    .order("completed_at", { ascending: false, nullsFirst: false });
  if (error) throw new Error("Falha ao ler projetos: " + error.message);
  if (!data.length) return projects;
  return (data as ProjectRow[]).map(toProject);
}
export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}
