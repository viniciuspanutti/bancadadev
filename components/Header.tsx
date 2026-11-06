"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const themeStorageKey = "bancadadev-theme";

export function Header() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeStorageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("theme-light", savedTheme === "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("theme-light", nextTheme === "light");
    window.localStorage.setItem(themeStorageKey, nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <header className="site-header">
      <div className="site-header__content">
        <a className="site-header__brand" href="/" aria-label="Bancadadev, página inicial">
          <span>Bancadadev</span>
        </a>

        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"} title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}>
          {isDark ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
              <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 3v2.1M12 18.9V21M21 12h-2.1M5.1 12H3M18.36 5.64l-1.48 1.48M7.12 16.88l-1.48 1.48M18.36 18.36l-1.48-1.48M7.12 7.12 5.64 5.64" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
              <path d="M20.2 14.72A8.5 8.5 0 0 1 9.28 3.8 8.5 8.5 0 1 0 20.2 14.72Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
