"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  isSupabaseConfigured: boolean;
};

export function AuthForm({ isSupabaseConfigured }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) return;

    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/novidades` },
      });

      if (error) setMessage("Não foi possível iniciar o login. Tente novamente.");
    } catch {
      setMessage("Não foi possível iniciar o login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const sendMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/novidades` },
      });

      setMessage(error ? "Não foi possível enviar o link. Tente novamente." : "Link enviado. Confira seu e-mail.");
    } catch {
      setMessage("Não foi possível enviar o link. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-sm">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Entre para receber.</h1>
      <button type="button" onClick={signInWithGoogle} disabled={loading || !isSupabaseConfigured} className="premium-button w-full px-6 py-4 text-base font-bold disabled:cursor-wait disabled:opacity-70">
        Entrar com Google
      </button>
      <div className="my-7 flex items-center gap-3 text-sm text-[var(--muted)]"><span className="h-px flex-1 bg-[var(--line)]" />ou<span className="h-px flex-1 bg-[var(--line)]" /></div>
      <form onSubmit={sendMagicLink} className="flex flex-col gap-3">
        <label htmlFor="email" className="sr-only">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required disabled={!isSupabaseConfigured} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" className="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-base outline-none placeholder:text-[var(--muted)] focus:border-[#89b6e8] disabled:cursor-not-allowed disabled:opacity-70" />
        <button type="submit" disabled={loading || !isSupabaseConfigured} className="premium-button w-full px-6 py-4 text-base font-bold disabled:cursor-wait disabled:opacity-70">Receber link por e-mail</button>
      </form>
      {!isSupabaseConfigured && <p className="mt-5 text-center text-sm text-[var(--muted)]" role="status">O cadastro está sendo configurado. Tente novamente em alguns minutos.</p>}
      {message && <p className="mt-5 text-center text-sm text-[var(--muted)]" role="status">{message}</p>}
    </section>
  );
}
