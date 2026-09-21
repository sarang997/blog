"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  }

  const nextLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={nextLabel} title={nextLabel}>
      <span className="theme-toggle-icon" aria-hidden="true" />
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
