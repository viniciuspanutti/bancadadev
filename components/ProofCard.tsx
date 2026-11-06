"use client";

import { useState } from "react";
import Link from "next/link";

export function ProofCard() {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-7 sm:gap-8">
      <a
        className="proof-link group relative block w-full overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-premium)] transition-transform duration-200 ease-out hover:-translate-y-0.5"
        href="/P2-POO.jpeg"
        download="prova-bancadadev.svg"
        onClick={() => setDownloaded(true)}
        aria-label="Baixar prova"
      >
        <img src="/P2-POO.jpeg" alt="Prova disponível para baixar" className="block h-80 w-full object-contain sm:h-96" />
        <span className="download-action premium-button absolute left-1/2 top-1/2 -translate-x-1/2 px-7 py-3 text-base font-bold">
          Baixar
        </span>
      </a>

      {downloaded && (
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/cadastro" className="premium-button px-7 py-3 text-base font-bold">
            Quero receber mais provas!
          </Link>
        </div>
      )}
    </div>
  );
}
