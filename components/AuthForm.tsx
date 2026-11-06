"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  isSupabaseConfigured: boolean;
};

export function AuthForm({ isSupabaseConfigured }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSupabaseConfigured) return;

    setLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const normalizedEmail = email.trim();
      const result = mode === "signup"
        ? await supabase.auth.signUp({
            email: normalizedEmail,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback?next=/novidades`,
            },
          })
        : await supabase.auth.signInWithPassword({ email: normalizedEmail, password });

      if (result.error) {
        setMessage(mode === "signup"
          ? "Não foi possível criar a conta. Confira os dados e tente novamente."
          : "E-mail ou senha incorretos.");
      } else if (mode === "signup" && !result.data.session) {
        setMessage("Conta criada. Confira seu e-mail para confirmar o cadastro.");
      } else {
        window.location.assign("/novidades");
      }
    } catch {
      setMessage("Não foi possível concluir. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-sm">
      <h1 className="mb-3 text-center text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Entre para receber.</h1>
      <p className="mb-8 text-center text-sm text-[var(--muted)]">Use apenas seu e-mail e uma senha.</p>
      <div className="mb-5 grid grid-cols-2 rounded-[10px] border border-[var(--line)] p-1 text-sm">
        <button type="button" onClick={() => { setMode("signup"); setMessage(""); }} className={`rounded-[7px] px-3 py-2 ${mode === "signup" ? "bg-white text-[#08101c]" : "text-[var(--muted)]"}`}>Criar conta</button>
        <button type="button" onClick={() => { setMode("signin"); setMessage(""); }} className={`rounded-[7px] px-3 py-2 ${mode === "signin" ? "bg-white text-[#08101c]" : "text-[var(--muted)]"}`}>Entrar</button>
      </div>
      <form onSubmit={submitAuth} className="flex flex-col gap-3">
        <label htmlFor="email" className="sr-only">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required disabled={!isSupabaseConfigured} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seu@email.com" className="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-base outline-none placeholder:text-[var(--muted)] focus:border-[#89b6e8] disabled:cursor-not-allowed disabled:opacity-70" />
        <label htmlFor="password" className="sr-only">Senha</label>
        <input id="password" name="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={6} required disabled={!isSupabaseConfigured} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="senha (mínimo de 6 caracteres)" className="w-full rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 text-base outline-none placeholder:text-[var(--muted)] focus:border-[#89b6e8] disabled:cursor-not-allowed disabled:opacity-70" />
        <button type="submit" disabled={loading || !isSupabaseConfigured} className="premium-button w-full px-6 py-4 text-base font-bold disabled:cursor-wait disabled:opacity-70">{loading ? "Aguarde..." : mode === "signup" ? "Criar minha conta" : "Entrar"}</button>
      </form>
      {!isSupabaseConfigured && <p className="mt-5 text-center text-sm text-[var(--muted)]" role="status">O cadastro está sendo configurado. Tente novamente em alguns minutos.</p>}
      {message && <p className="mt-5 text-center text-sm text-[var(--muted)]" role="status">{message}</p>}
    </section>
  );
}
