"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ProfileFormProps = { userId: string; email: string; initialName?: string | null };

export function ProfileForm({ userId, email, initialName }: ProfileFormProps) {
  const [name, setName] = useState(initialName ?? "");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [period, setPeriod] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setMessage("");
    const { error } = await createClient().from("profiles").update({ nome: name.trim(), faculdade: college.trim(), curso: course.trim(), periodo: period.trim(), idade: Number(age) }).eq("id", userId);
    if (error) setMessage("Não foi possível salvar seus dados. Tente novamente.");
    else window.location.assign("/novidades");
    setLoading(false);
  };

  return (
    <section className="w-full max-w-lg">
      <h1 className="mb-3 text-center text-4xl font-bold tracking-[-0.04em]">Complete seu cadastro.</h1>
      <p className="mb-8 text-center text-sm text-[var(--muted)]">Seu e-mail ({email}) já foi confirmado.</p>
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <input name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome completo" className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 outline-none sm:col-span-2" />
        <input name="college" autoComplete="organization" required value={college} onChange={(e) => setCollege(e.target.value)} placeholder="Faculdade" className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 outline-none sm:col-span-2" />
        <input name="course" autoComplete="organization-title" required value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Curso" className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 outline-none" />
        <input name="period" required value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Período (ex.: 3º)" className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 outline-none" />
        <input name="age" type="number" min="0" max="130" required value={age} onChange={(e) => setAge(e.target.value)} placeholder="Idade" className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] px-5 py-4 outline-none" />
        <button type="submit" disabled={loading} className="premium-button px-6 py-4 text-base font-bold disabled:opacity-70 sm:col-span-2">{loading ? "Salvando..." : "Salvar cadastro"}</button>
      </form>
      {message && <p className="mt-5 text-center text-sm text-[var(--muted)]" role="status">{message}</p>}
    </section>
  );
}
