"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/format";
import { BUCKET } from "@/lib/supabase/config";
import { serverDb } from "@/lib/supabase/server";

type Kind = "products" | "projects";
const photoTable = (k: Kind) => (k === "products" ? "product_photos" : "project_photos");
const parentCol = (k: Kind) => (k === "products" ? "product_id" : "project_id");
const adminPath = (k: Kind) => (k === "products" ? "/admin/produtos" : "/admin/projetos");

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const opt = (f: FormData, k: string) => str(f, k) || null;
const bool = (f: FormData, k: string) => f.get(k) === "on" || f.get(k) === "true";

/** Toda ação do painel passa por aqui. O banco também barra quem não é admin (RLS). */
async function admin() {
  const db = serverDb();
  const { data: { user } } = await db.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: ok } = await db.rpc("is_admin");
  if (!ok) redirect("/admin/login?erro=sem-acesso");
  return db;
}

function refresh() {
  revalidateTag("content");
  revalidatePath("/", "layout");
}

const fail = (path: string, message: string): never =>
  redirect(`${path}?erro=${encodeURIComponent(message.includes("duplicate key") ? "Já existe um item com esse endereço (slug)." : message)}`);

// ───────── Sessão ─────────

export async function signIn(_prev: string | null, f: FormData): Promise<string | null> {
  const db = serverDb();
  const { error } = await db.auth.signInWithPassword({ email: str(f, "email"), password: String(f.get("password") ?? "") });
  if (error) return "E-mail ou senha incorretos.";
  const { data: ok } = await db.rpc("is_admin");
  if (!ok) {
    await db.auth.signOut();
    return "Este usuário não tem acesso ao painel.";
  }
  redirect("/admin");
}

export async function signOut() {
  await serverDb().auth.signOut();
  redirect("/admin/login");
}

// ───────── Produtos ─────────

export async function saveProduct(f: FormData) {
  const db = await admin();
  const id = str(f, "id");
  const back = `/admin/produtos/${id || "novo"}`;
  const name = str(f, "name");
  const price = Number(str(f, "price").replace(/\./g, "").replace(",", "."));
  if (!name) fail(back, "Informe o nome do produto.");
  if (!Number.isFinite(price) || price < 0) fail(back, "Preço inválido.");
  const row = {
    name,
    slug: slugify(str(f, "slug") || name),
    category: opt(f, "category"),
    detail: opt(f, "detail"),
    description: opt(f, "description"),
    price,
    finishes: str(f, "finishes").split(",").map((s) => s.trim()).filter(Boolean),
    lead_time: opt(f, "lead_time"),
    in_stock: bool(f, "in_stock"),
    badge: opt(f, "badge"),
    is_featured: bool(f, "is_featured"),
    is_available: bool(f, "is_available"),
    updated_at: new Date().toISOString(),
  };
  if (id) {
    const { error } = await db.from("products").update(row).eq("id", id);
    if (error) fail(back, error.message);
    refresh();
    redirect(`${back}?ok=1`);
  }
  const { data, error } = await db.from("products").insert(row).select("id").single();
  if (error || !data) fail(back, error?.message ?? "Não foi possível salvar.");
  refresh();
  redirect(`/admin/produtos/${data!.id}?ok=novo`);
}

// ───────── Projetos ─────────

export async function saveProject(f: FormData) {
  const db = await admin();
  const id = str(f, "id");
  const back = `/admin/projetos/${id || "novo"}`;
  const title = str(f, "title");
  if (!title) fail(back, "Informe o nome do projeto.");
  const row = {
    title,
    slug: slugify(str(f, "slug") || title),
    room: opt(f, "room"),
    city: opt(f, "city"),
    completed_at: opt(f, "completed_at"),
    material: opt(f, "material"),
    lead_time: opt(f, "lead_time"),
    description: opt(f, "description"),
    is_featured: bool(f, "is_featured"),
    is_published: bool(f, "is_published"),
    updated_at: new Date().toISOString(),
  };
  if (id) {
    const { error } = await db.from("projects").update(row).eq("id", id);
    if (error) fail(back, error.message);
    refresh();
    redirect(`${back}?ok=1`);
  }
  const { data, error } = await db.from("projects").insert(row).select("id").single();
  if (error || !data) fail(back, error?.message ?? "Não foi possível salvar.");
  refresh();
  redirect(`/admin/projetos/${data!.id}?ok=novo`);
}

// ───────── Comum a produtos e projetos ─────────

const FLAGS: Record<Kind, string[]> = {
  products: ["is_available", "is_featured", "in_stock"],
  projects: ["is_published", "is_featured"],
};

/** Liga ou desliga um campo direto na lista (publicado, destaque, pronta entrega). */
export async function toggleFlag(f: FormData) {
  const db = await admin();
  const kind = str(f, "kind") as Kind;
  const field = str(f, "field");
  if (!FLAGS[kind]?.includes(field)) return;
  await db.from(kind).update({ [field]: bool(f, "value") }).eq("id", str(f, "id"));
  refresh();
}

export async function deleteItem(f: FormData) {
  const db = await admin();
  const kind = str(f, "kind") as Kind;
  if (!FLAGS[kind]) return;
  const id = str(f, "id");
  const { data: photos } = await db.from(photoTable(kind)).select("storage_path").eq(parentCol(kind), id);
  const { error } = await db.from(kind).delete().eq("id", id);
  if (error) fail(adminPath(kind), error.message);
  const paths = (photos ?? []).map((p) => p.storage_path as string);
  if (paths.length) await db.storage.from(BUCKET).remove(paths);
  refresh();
  redirect(`${adminPath(kind)}?ok=apagado`);
}

// ───────── Fotos ─────────

export async function addPhoto(kind: Kind, parentId: string, storagePath: string, url: string) {
  const db = await admin();
  if (!FLAGS[kind] || !storagePath.startsWith(`${kind}/${parentId}/`)) return { ok: false };
  const { data: last } = await db.from(photoTable(kind)).select("display_order").eq(parentCol(kind), parentId).order("display_order", { ascending: false }).limit(1);
  const display_order = (last?.[0]?.display_order ?? -1) + 1;
  const { error } = await db.from(photoTable(kind)).insert({ [parentCol(kind)]: parentId, storage_path: storagePath, url, display_order });
  refresh();
  return { ok: !error };
}

export async function deletePhoto(kind: Kind, photoId: string) {
  const db = await admin();
  if (!FLAGS[kind]) return;
  const { data } = await db.from(photoTable(kind)).delete().eq("id", photoId).select("storage_path").single();
  if (data?.storage_path) await db.storage.from(BUCKET).remove([data.storage_path]);
  refresh();
}

/** Regrava a ordem das fotos; a primeira é a capa. */
export async function orderPhotos(kind: Kind, ids: string[]) {
  const db = await admin();
  if (!FLAGS[kind]) return;
  await Promise.all(ids.map((id, i) => db.from(photoTable(kind)).update({ display_order: i }).eq("id", id)));
  refresh();
}

// ───────── Orçamentos ─────────

export async function setQuoteStatus(f: FormData) {
  const db = await admin();
  const status = str(f, "status") === "respondido" ? "respondido" : "novo";
  await db.from("quotes").update({ status }).eq("id", str(f, "id"));
  revalidatePath("/admin", "layout");
}

export async function deleteQuote(f: FormData) {
  const db = await admin();
  await db.from("quotes").delete().eq("id", str(f, "id"));
  revalidatePath("/admin", "layout");
}

// ───────── Configurações ─────────

export async function saveCompany(f: FormData) {
  const db = await admin();
  const whatsapp = str(f, "whatsapp_number").replace(/\D/g, "");
  if (whatsapp && (whatsapp.length < 12 || whatsapp.length > 13)) {
    fail("/admin/configuracoes", "WhatsApp deve ter DDI + DDD + número, só dígitos (ex.: 5511912345678).");
  }
  const cnpj = str(f, "cnpj").replace(/\D/g, "");
  if (cnpj && cnpj.length !== 14) fail("/admin/configuracoes", "CNPJ deve ter 14 dígitos.");
  const { error } = await db.from("company_info").upsert({
    id: 1,
    whatsapp_number: whatsapp || null,
    phone_label: opt(f, "phone_label"),
    contact_email: opt(f, "contact_email"),
    address: opt(f, "address"),
    history_text: opt(f, "history_text"),
    legal_name: opt(f, "legal_name"),
    cnpj: cnpj || null,
    updated_at: new Date().toISOString(),
  });
  if (error) {
    const missing = /legal_name|cnpj/.test(error.message);
    fail("/admin/configuracoes", missing ? "Falta criar os campos de razão social e CNPJ no banco: rode supabase/002_dados_legais.sql no SQL Editor do Supabase." : error.message);
  }
  refresh();
  redirect("/admin/configuracoes?ok=1");
}
