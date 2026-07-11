"use client";

import React from "react";
import { MealInfo } from "@/types/plan";

interface MealCardProps {
  type: "Breakfast" | "Lunch" | "Dinner";
  data: MealInfo;
}

export default function MealCard({ type, data }: MealCardProps) {
  // Select emoji & color theme based on meal type
  const getTheme = () => {
    switch (type) {
      case "Breakfast":
        return {
          icon: "🍳",
          borderColor: "border-l-amber-500",
          bgColor: "bg-amber-500/5",
          accentText: "text-amber-600 dark:text-amber-400"
        };
      case "Lunch":
        return {
          icon: "🥗",
          borderColor: "border-l-brand-green",
          bgColor: "bg-brand-green/5",
          accentText: "text-brand-green"
        };
      case "Dinner":
        return {
          icon: "🍲",
          borderColor: "border-l-brand-orange",
          bgColor: "bg-brand-orange/5",
          accentText: "text-brand-orange"
        };
    }
  };

  const theme = getTheme();

  return (
    <div className={`print-card bg-bg-card border border-border-color border-l-4 ${theme.borderColor} rounded-2xl p-6 shadow-premium hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{theme.icon}</span>
            <span className={`text-xs font-bold uppercase tracking-wider ${theme.accentText}`}>
              {type}
            </span>
          </div>
          
          {/* Cooking Time Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-green-soft text-brand-green text-xs font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {data.time || "30m"}
          </div>
        </div>

        {/* Meal Title */}
        <h3 className="text-xl font-bold text-text-main mb-3 leading-snug">
          {data.meal || "Tasty AI Recommendation"}
        </h3>

        {/* Ingredients Header */}
        <div className="mt-4">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
            Key Ingredients
          </h4>
          <ul className="space-y-1.5">
            {data.ingredients && data.ingredients.length > 0 ? (
              data.ingredients.map((ing, index) => (
                <li key={index} className="text-sm text-text-muted flex items-start gap-2">
                  <span className="text-brand-green mt-1 text-xs">•</span>
                  <span>{ing}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-text-muted italic">No specific ingredients listed.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
