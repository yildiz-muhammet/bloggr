"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (

<span
onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
className='hover:bg-gray-100 hover:dark:bg-primary  p-1.5 rounded-full cursor-pointer transition-colors first-letter:


'>
{theme === 'dark' ? <FiSun /> : <FiMoon />}
</span>
  );
};

export default ThemeSwitcher;
