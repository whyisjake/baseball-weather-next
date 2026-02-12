import { useState, useEffect } from 'react';
import { Sun, MoonStars } from 'react-bootstrap-icons';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage and system preference on mount
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedMode === 'true' || (!savedMode && prefersDark);
    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <MoonStars className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
}
