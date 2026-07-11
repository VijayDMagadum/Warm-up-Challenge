"use client";

import React from "react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onHome?: () => void;
}

export default function Navbar({ darkMode, setDarkMode, onHome }: NavbarProps) {
  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-bg-card/75 border-b border-border-color no-print transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-2.5 rounded-2xl pr-3 text-left transition-opacity hover:opacity-80 cursor-pointer"
          aria-label="Go to home"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-white shadow-md shadow-brand-green/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 10.5h.008v.008H8.25V10.5Zm.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 11.25a3 3 0 0 0 3-3V4.5a3 3 0 0 0-6 0v3.75a3 3 0 0 0 3 3Z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
              CookSmart AI
            </h1>
            <p className="text-[10px] text-text-muted -mt-1 font-medium hidden sm:block">
              Your AI Culinary Assistant
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-border-color bg-bg-card hover:bg-brand-green-soft hover:border-brand-green/30 text-text-main hover:text-brand-green transition-all duration-200 cursor-pointer shadow-sm"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              // Sun Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m0 13.5V21M4.93 4.93l1.68 1.68m10.78 10.78l1.68 1.68M3 12h2.25m13.5 0H21M6.61 17.39l1.68-1.68m10.78-10.78l1.68-1.68M12 5.25a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Z"
                />
              </svg>
            ) : (
              // Moon Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
