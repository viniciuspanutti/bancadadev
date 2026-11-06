import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function Novidades() {
  if (!isSupabaseConfigured) redirect("/cadastro");

  let hasAuthenticatedUser = false;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    hasAuthenticatedUser = Boolean(user);
  } catch (error) {
    console.error("Não foi possível verificar a sessão do usuário.", error);
  }

  if (!hasAuthenticatedUser) redirect("/cadastro");

  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <h1 className="text-5xl font-bold tracking-[-0.05em] sm:text-7xl">Novidades em breve!</h1>
      <p className="text-5xl tracking-[-0.05em] sm:text-7xl">Prova de S.O</p>
    </main>
  );
}
