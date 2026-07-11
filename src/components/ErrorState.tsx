"use client";

import React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="max-w-md mx-auto text-center py-12 px-6 bg-red-500/5 border border-red-500/10 rounded-3xl shadow-premium animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/40 text-red-500 flex items-center justify-center mx-auto mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-9 h-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-text-main">
        Generation Failed
      </h3>
      
      <p className="mt-2 text-sm text-text-muted leading-relaxed">
        {message || "Unable to generate your meal plan. Please try again."}
      </p>

      <button
        onClick={onRetry}
        className="mt-6 px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors cursor-pointer shadow-md shadow-red-500/10 hover:shadow-red-500/20 inline-flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Try Again
      </button>
    </div>
  );
}
