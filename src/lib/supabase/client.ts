import { createBrowserClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./config";

/** Cliente do navegador, usado no admin para enviar fotos direto ao Storage. */
export const browserDb = () => createBrowserClient(supabaseUrl, supabaseKey);
