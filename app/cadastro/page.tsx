import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type CadastroProps = {
  searchParams: Promise<{ erro?: string }>;
};

export default async function Cadastro({ searchParams }: CadastroProps) {
  const { erro } = await searchParams;
  let hasAuthenticatedUser = false;

  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      hasAuthenticatedUser = Boolean(user);
    } catch (error) {
      console.error("Não foi possível verificar a sessão do usuário.", error);
    }
  }

  if (hasAuthenticatedUser) redirect("/novidades");

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <AuthForm
        isSupabaseConfigured={isSupabaseConfigured}
        initialMessage={erro === "google" ? "A entrada com Google ainda não está disponível. Use o link por e-mail por enquanto." : ""}
      />
    </main>
  );
}
