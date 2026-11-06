"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = { isSupabaseConfigured: boolean };

export function AuthForm({ isSupabaseConfigured }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true); setMessage("");
    const { error } = await createClient().auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback?next=/cadastro` } });
    if (error) { setMessage("Não foi possível entrar com Google. Confira a configuração do provedor."); setLoading(false); }
  };

  const sendMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSupabaseConfigured) return;
    setLoading(true); setMessage("");
    const { error } = await createClient().auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/cadastro` } });
    setMessage(error ? "Não foi possível enviar o link. Tente novamente." : "Link enviado. Confira seu e-mail para continuar.");
    setLoading(false);
  };

  return (
    <section className="w-full max-w-sm">
      <h1 className="mb-3 text-center text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Entre para receber.</h1>
      <p className="mb-8 text-center text-sm text-[var(--muted)]">Use sua conta Google ou um link enviado por e-mail.</p>
      <button type="button" onClick={signInWithGoogle} disabled={loading || !isSupabaseConfigured} className="premium-button mb-4 w-full px-6 py-4 text-base font-bold disabled:cursor-wait disabled:opacity-70">Entrar com Google</button>
      <div className="mb-4 flex items-center gap-3 text-xs text-[var(--muted)]"><span className="h-px flex-1 bg-[var(--line)]" /><span>ou</span><span className="h-px flex-1 bg-[var(--line)]" /></div>
      <form onSubmit={sendMagicLink} className="flex flex-col gap-3">
        <label htmlFor="email" className="sr-only">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required disabled={loading || !isSupabaseConfigured} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" className="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-base outline-none placeholder:text-[var(--muted)] focus:border-[#89b6e8] disabled:opacity-70" />
        <button type="submit" disabled={loading || !isSupabaseConfigured} className="w-full rounded-[10px] border border-[var(--line)] px-6 py-4 text-base font-bold disabled:cursor-wait disabled:opacity-70">Enviar link mágico</button>
      </form>
      {!isSupabaseConfigured && <p className="mt-5 text-center text-sm text-[var(--muted)]" role="status">O cadastro está sendo configurado.</p>}
      {message && <p className="mt-5 text-center text-sm text-[var(--muted)]" role="status">{message}</p>}
    </section>
  );
}
