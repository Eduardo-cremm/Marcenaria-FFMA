import { createClient } from "@supabase/supabase-js";
import { hasSupabase, supabaseKey, supabaseUrl } from "./config";

/**
 * Cliente anônimo, sem cookies, para as páginas públicas.
 * As leituras ficam em cache por 60 s e são invalidadas pela tag "content"
 * sempre que o admin salva alguma coisa.
 */
export function publicDb() {
  if (!hasSupabase) return null;
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 60, tags: ["content"] } }) },
  });
}

/** Cliente anônimo sem cache, para gravações públicas (formulário de contato). */
export function publicWriteDb() {
  if (!hasSupabase) return null;
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
}
