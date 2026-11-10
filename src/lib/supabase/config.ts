export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
/** Sem as duas variáveis, o site usa o conteúdo de exemplo e o painel admin fica desligado. */
export const hasSupabase = Boolean(supabaseUrl && supabaseKey);
export const BUCKET = "photos";
