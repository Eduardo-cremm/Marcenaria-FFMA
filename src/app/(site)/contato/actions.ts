"use server";

import { z } from "zod";
import { publicWriteDb } from "@/lib/supabase/public";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.union([z.literal(""), z.string().trim().email().max(160)]),
  phone: z.string().trim().max(30),
  city: z.string().trim().max(80),
  subject: z.string().trim().min(1).max(80),
  message: z.string().trim().min(3).max(4000),
  consent: z.literal(true),
  website: z.string().max(0), // campo-isca: pessoas não veem, robôs preenchem
});

/** Guarda o pedido de orçamento para a equipe ver no /admin. O envio pelo WhatsApp acontece no navegador. */
export async function saveQuote(input: unknown): Promise<{ ok: boolean }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false };
  const db = publicWriteDb();
  if (!db) return { ok: true };
  const { name, email, phone, city, subject, message } = parsed.data;
  const { error } = await db.from("quotes").insert({ name, email: email || null, phone: phone || null, city: city || null, subject, message });
  return { ok: !error };
}
