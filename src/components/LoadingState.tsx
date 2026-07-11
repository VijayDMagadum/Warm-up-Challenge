"use client";

import React, { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Consulting with AI Master Chefs...",
  "Chopping vegetables & prepping ingredients...",
  "Simmering the broth & adjusting spices...",
  "Structuring grocery list & sorting best prices...",
  "Optimizing ingredient substitutions for allergens...",
  "Arranging your hourly kitchen schedule...",
  "Plating the perfect recipe selection..."
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto text-center py-16 px-6 flex flex-col items-center justify-center transition-all duration-300">
      {/* Cooking Pot Wrapper */}
      <div className="relative w-40 h-44 mb-8">
        
        {/* Steam Waves */}
        <div className="absolute -top-6 left-[20%] w-2 h-8 bg-brand-green/20 rounded-full blur-[1px] animate-steam-1" />
        <div className="absolute -top-10 left-[45%] w-2.5 h-10 bg-brand-green/25 rounded-full blur-[1px] animate-steam-2" />
        <div className="absolute -top-7 left-[70%] w-2 h-8 bg-brand-green/20 rounded-full blur-[1px] animate-steam-3" />

        {/* Bubbles */}
        <div className="absolute top-10 left-[35%] w-2 h-2 bg-brand-orange/60 rounded-full animate-bubble-1" />
        <div className="absolute top-12 left-[55%] w-3 h-3 bg-brand-orange/40 rounded-full animate-bubble-2" />
        <div className="absolute top-8 left-[45%] w-1.5 h-1.5 bg-brand-orange/50 rounded-full animate-bubble-3" />

        {/* The Pot Body */}
        <div className="absolute bottom-4 left-4 right-4 h-24 bg-gradient-to-b from-[#3bb16f] to-[#2e965c] rounded-b-[40px] rounded-t-lg border-b-4 border-[#257d4b] shadow-lg flex items-center justify-center">
          {/* Chef Cap Logo on Pot */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-white/30"
          >
            <path d="M12 2a3 3 0 0 0-3 3v.152A4.475 4.475 0 0 0 7.5 5A4.5 4.5 0 0 0 3 9.5c0 .62.128 1.21.36 1.745A4.5 4.5 0 0 0 6 20.25h12a4.5 4.5 0 0 0 2.64-8.877c.232-.535.36-1.125.36-1.745A4.5 4.5 0 0 0 16.5 5c-.538 0-1.05.1-1.52.279V5a3 3 0 0 0-3-3Z" />
          </svg>
        </div>

        {/* Pot Lid */}
        <div className="absolute bottom-[108px] left-2 right-2 h-5 bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 rounded-t-full border-b border-gray-400 dark:border-gray-900 animate-lid shadow-sm">
          {/* Lid Knob */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-4 bg-gray-500 dark:bg-gray-600 rounded-t-md border-b-2 border-gray-400" />
        </div>

        {/* Left Pot Handle */}
        <div className="absolute bottom-16 -left-1 w-6 h-10 border-4 border-[#3bb16f] rounded-l-2xl border-r-0" />
        
        {/* Right Pot Handle */}
        <div className="absolute bottom-16 -right-1 w-6 h-10 border-4 border-[#3bb16f] rounded-r-2xl border-l-0" />
      </div>

      {/* Loading Status Text */}
      <h3 className="text-xl font-bold text-text-main animate-pulse">
        Generating Your Plan
      </h3>
      <p className="mt-2 text-sm text-text-muted h-10 max-w-xs text-center font-medium italic transition-all duration-300">
        &ldquo;{LOADING_MESSAGES[messageIndex]}&rdquo;
      </p>
      
      {/* Decorative Loading Dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-bounce" />
      </div>
    </div>
  );
}
