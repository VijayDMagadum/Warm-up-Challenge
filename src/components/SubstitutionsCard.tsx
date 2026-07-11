"use client";

import React from "react";

interface SubstitutionsCardProps {
  substitutions: string[];
}

export default function SubstitutionsCard({ substitutions }: SubstitutionsCardProps) {
  // Helper to split "A -> B" or "A → B" or "A to B"
  const parseSubstitution = (sub: string) => {
    const separators = ["->", "→", " to ", "=>"];
    for (const sep of separators) {
      if (sub.includes(sep)) {
        const parts = sub.split(sep);
        return {
          original: parts[0].trim(),
          replacement: parts[1].trim()
        };
      }
    }
    // Fallback if no separator matches
    return {
      original: sub,
      replacement: null
    };
  };

  return (
    <div className="print-card bg-bg-card border border-border-color rounded-3xl p-6 sm:p-8 shadow-premium hover:shadow-md transition-all duration-200">
      <div className="border-b border-border-color pb-4 mb-6">
        <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
          <span>🔄</span> Ingredient Substitutions
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Healthy or allergen-friendly alternatives for your recipes.
        </p>
      </div>

      {substitutions && substitutions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {substitutions.map((sub, index) => {
            const { original, replacement } = parseSubstitution(sub);

            return (
              <div
                key={index}
                className="p-4 rounded-2xl bg-bg-app border border-border-color flex items-center justify-between gap-4"
              >
                {replacement ? (
                  <>
                    {/* Original Ingredient */}
                    <div className="flex-1">
                      <span className="block text-[10px] font-bold text-text-muted uppercase tracking-wider">
                        Original
                      </span>
                      <span className="text-sm font-semibold text-text-main">
                        {original}
                      </span>
                    </div>

                    {/* Arrow Divider */}
                    <div className="w-8 h-8 rounded-full bg-brand-orange-soft flex items-center justify-center text-brand-orange flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>

                    {/* Substitution Ingredient */}
                    <div className="flex-1 text-right">
                      <span className="block text-[10px] font-bold text-brand-green uppercase tracking-wider">
                        Substitute
                      </span>
                      <span className="text-sm font-bold text-brand-green">
                        {replacement}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex items-center gap-3">
                    <span className="text-brand-orange">•</span>
                    <span className="text-sm font-medium text-text-main">{original}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-text-muted italic text-center py-6">
          No ingredient substitutions recommended for this plan.
        </p>
      )}
    </div>
  );
}
