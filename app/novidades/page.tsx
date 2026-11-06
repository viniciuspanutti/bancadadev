import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Novidades() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/cadastro");

  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <h1 className="text-5xl font-bold tracking-[-0.05em] sm:text-7xl">Novidades em breve!</h1>
    </main>
  );
}
