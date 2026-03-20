'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    // Render placeholder to avoid layout shift
    return <button className="w-9 h-9" aria-hidden />;
  }

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      aria-label={dark ? '切換亮色模式' : '切換暗色模式'}
      title={dark ? '切換亮色模式' : '切換暗色模式'}
    >
      <span className="text-lg transition-transform duration-300" style={{ display: 'inline-block', transform: dark ? 'rotate(360deg)' : 'rotate(0deg)' }}>
        {dark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
      </span>
    </button>
  );
}
