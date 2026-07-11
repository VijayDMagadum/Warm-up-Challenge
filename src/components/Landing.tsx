"use client";

import React from "react";

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="relative overflow-hidden py-16 sm:py-24 transition-all duration-300">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
        {/* Badges/Highlights */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-soft border border-brand-green/20 text-brand-green text-xs font-semibold mb-6 animate-fade-in shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
          Powered by OpenRouter AI
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-main leading-tight sm:leading-none">
          Simplify Your Daily Meals with{" "}
          <span className="block mt-2 sm:inline bg-gradient-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
            CookSmart AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
          Plan your meals, grocery shopping, and cooking schedule in seconds. Save money, reduce food waste, and eat healthier customized just for you.
        </p>

        {/* CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-green hover:bg-brand-green-hover text-white font-semibold text-lg transition-all duration-200 cursor-pointer shadow-lg shadow-brand-green/20 hover:shadow-brand-green/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Generate My Cooking Plan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>

        {/* Quick Features List */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-bg-card border border-border-color shadow-premium hover:border-brand-green/20 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-brand-green-soft flex items-center justify-center text-brand-green mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-text-main">Budget-Friendly Planner</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Input your target budget and receive grocery lists and dishes matching your wallet.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-bg-card border border-border-color shadow-premium hover:border-brand-green/20 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-brand-orange-soft flex items-center justify-center text-brand-orange mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-text-main">Diet & Allergy Safe</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Tailor suggestions for vegetarian, keto, vegan preferences and auto-substitute key allergens.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-bg-card border border-border-color shadow-premium hover:border-brand-orange/20 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-brand-green-soft flex items-center justify-center text-brand-green mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-text-main">Cooking Timeline</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Follow an hourly structured timeline for preparation, cooking, and serving throughout the day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
