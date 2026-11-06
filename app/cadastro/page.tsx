import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { createClient } from "@/lib/supabase/server";

export default async function Cadastro() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/novidades");

  return <main className="flex min-h-screen items-center justify-center px-5 py-10"><AuthForm /></main>;
}
