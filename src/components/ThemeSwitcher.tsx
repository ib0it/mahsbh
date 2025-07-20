"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 font-bold text-white bg-gray-600 rounded-md hover:bg-gray-700"
    >
      {theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
    </button>
  );
}
