import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { AuthForm } from "@/components/AuthForm";
import { ProfileForm } from "@/components/ProfileForm";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type CadastroProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Cadastro({ searchParams }: CadastroProps) {
  let user: User | null = null;
  let profileComplete = false;

  if (isSupabaseConfigured) {
    try {
      const supabase = await createClient();
      const result = await supabase.auth.getUser();
      user = result.data.user;
      if (user) {
        const { data: profile } = await supabase.from("profiles").select("nome,faculdade,curso,periodo,idade").eq("id", user.id).maybeSingle();
        profileComplete = Boolean(profile?.nome && profile.faculdade && profile.curso && profile.periodo && profile.idade !== null);
      }
    } catch (error) {
      console.error("Não foi possível verificar a sessão do usuário.", error);
    }
  }

  if (user && profileComplete) redirect("/novidades");

  return (
    <main className="page-shell flex min-h-screen items-center justify-center px-5 py-12 sm:px-8 sm:py-16">
      {user ? <ProfileForm userId={user.id} email={user.email ?? ""} initialName={user.user_metadata?.full_name ?? user.user_metadata?.name} /> : <AuthForm isSupabaseConfigured={isSupabaseConfigured} />}
    </main>
  );
}
