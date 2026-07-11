"use client";

import React, { useState } from "react";

interface GroceryListProps {
  items: string[];
}

export default function GroceryList({ items }: GroceryListProps) {
  // Store the checked state of each grocery item
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [copied, setCopied] = useState(false);

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleCopy = async () => {
    try {
      const checkedText = items
        .map((item) => {
          const status = checkedItems[item] ? " [x] " : " [ ] ";
          return `${status}${item}`;
        })
        .join("\n");
      
      const textToCopy = `🛒 CookSmart AI Grocery List:\n\n${checkedText}`;
      await navigator.clipboard.writeText(textToCopy);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="print-card bg-bg-card border border-border-color rounded-3xl p-6 sm:p-8 shadow-premium hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-color pb-4 mb-6 no-print">
        <div>
          <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
            <span>🛒</span> Grocery List
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Check off ingredients as you shop or prep.
          </p>
        </div>
        
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
            copied
              ? "bg-brand-green-soft border-brand-green text-brand-green"
              : "bg-bg-card border-border-color text-text-main hover:bg-brand-green-soft hover:border-brand-green/30 hover:text-brand-green"
          }`}
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.25c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
              Copy Grocery List
            </>
          )}
        </button>
      </div>

      {/* Printable Header */}
      <h3 className="text-lg font-bold text-black hidden print:block mb-3">
        🛒 Grocery List
      </h3>

      {/* Items list */}
      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {items.map((item, index) => {
            const isChecked = !!checkedItems[item];
            return (
              <div
                key={index}
                onClick={() => toggleItem(item)}
                className={`p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center gap-3 select-none ${
                  isChecked
                    ? "bg-brand-green-soft/40 border-brand-green/20 text-text-muted line-through"
                    : "bg-bg-card border-border-color text-text-main hover:border-brand-green/25"
                }`}
              >
                <div
                  className={`w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    isChecked
                      ? "border-brand-green bg-brand-green text-white"
                      : "border-border-color bg-bg-card"
                  }`}
                >
                  {isChecked && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium leading-tight">{item}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-text-muted italic text-center py-6">
          No groceries needed. You already have all necessary ingredients!
        </p>
      )}
    </div>
  );
}
