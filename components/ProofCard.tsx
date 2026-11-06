"use client";

import { useState } from "react";
import Link from "next/link";

export function ProofCard() {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-8">
      <a
        className="proof-link group relative block w-full overflow-hidden rounded-xl border border-[var(--line)] shadow-[var(--shadow-premium)]"
        href="/P2-POO.jpeg"
        download="prova-bancadadev.svg"
        onClick={() => setDownloaded(true)}
        aria-label="Baixar prova"
      >
        <img src="/P2-POO.jpeg" alt="Prova disponível para baixar" className="block h-auto w-full" />
        <span className="download-action premium-button absolute left-1/2 top-1/2 -translate-x-1/2 px-7 py-4 text-base font-bold">
          Baixar
        </span>
      </a>

      {downloaded && (
        <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-col items-center gap-4 text-center duration-300">
          <p className="text-lg text-[var(--muted)]">Quer receber as próximas?</p>
          <Link href="/cadastro" className="premium-button px-7 py-4 text-base font-bold">
            Quero receber mais provas
          </Link>
        </div>
      )}
    </div>
  );
}
