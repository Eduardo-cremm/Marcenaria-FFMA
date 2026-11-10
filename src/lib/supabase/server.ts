import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseKey, supabaseUrl } from "./config";

/** Cliente com a sessão do usuário logado (painel admin). */
export function serverDb() {
  const store = cookies();
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Em Server Components não dá para gravar cookies; o middleware renova a sessão.
        }
      },
    },
  });
}
