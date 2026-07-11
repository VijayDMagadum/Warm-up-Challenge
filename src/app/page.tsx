"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import CookingForm from "@/components/CookingForm";
import LoadingState from "@/components/LoadingState";
import MealCard from "@/components/MealCard";
import GroceryList from "@/components/GroceryList";
import BudgetCard from "@/components/BudgetCard";
import SubstitutionsCard from "@/components/SubstitutionsCard";
import Timeline from "@/components/Timeline";
import ErrorState from "@/components/ErrorState";
import { CookingPlan, UserPreferences } from "@/types/plan";

type ViewState = "landing" | "form" | "loading" | "results" | "error";

export default function Home() {
  const [view, setView] = useState<ViewState>("landing");
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [plan, setPlan] = useState<CookingPlan | null>(null);
  const [error, setError] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Sync state with LocalStorage on client mount
  useEffect(() => {
    const storedPlan = localStorage.getItem("cooksmart_plan");
    const storedPrefs = localStorage.getItem("cooksmart_prefs");
    const storedTheme = localStorage.getItem("theme");

    // Handle dark theme setup
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = storedTheme === "dark" || (!storedTheme && systemPrefersDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Set state asynchronously to avoid React hook linter complaints
    setTimeout(() => {
      setMounted(true);
      setDarkMode(isDark);
      if (storedPlan && storedPrefs) {
        try {
          setPlan(JSON.parse(storedPlan));
          setPreferences(JSON.parse(storedPrefs));
          setView("results");
        } catch (e) {
          console.error("Error reading stored plan", e);
          localStorage.removeItem("cooksmart_plan");
          localStorage.removeItem("cooksmart_prefs");
        }
      }
    }, 0);
  }, []);

  const generatePlan = async (prefsToUse: UserPreferences) => {
    setView("loading");
    setError("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(prefsToUse)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate your meal plan. Please try again.");
      }

      setPlan(data);
      setPreferences(prefsToUse);
      localStorage.setItem("cooksmart_plan", JSON.stringify(data));
      localStorage.setItem("cooksmart_prefs", JSON.stringify(prefsToUse));
      setView("results");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unable to generate your meal plan. Please try again.";
      console.error("Plan generation error:", err);
      setError(errorMessage);
      setView("error");
    }
  };

  const handleReset = () => {
    localStorage.removeItem("cooksmart_plan");
    localStorage.removeItem("cooksmart_prefs");
    setPlan(null);
    setPreferences(null);
    setView("form");
  };

  const handleHome = () => {
    setError("");
    setView("landing");
  };

  const handleRegenerate = () => {
    if (preferences) {
      generatePlan(preferences);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Prevent server-side rendering mismatch for client-only theme features
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* App Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onHome={handleHome} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {view !== "landing" && view !== "loading" && (
          <div className="no-print mb-6">
            <button
              type="button"
              onClick={handleHome}
              className="inline-flex items-center gap-2 rounded-2xl border border-border-color bg-bg-card px-4 py-2.5 text-sm font-semibold text-text-main shadow-sm transition-all duration-200 hover:border-brand-green/30 hover:bg-brand-green-soft hover:text-brand-green cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </button>
          </div>
        )}
        
        {/* LANDING VIEW */}
        {view === "landing" && (
          <Landing onStart={() => setView("form")} />
        )}

        {/* PREFERENCE FORM VIEW */}
        {view === "form" && (
          <div className="py-4">
            <CookingForm onSubmit={generatePlan} isLoading={false} initialPreferences={preferences || undefined} />
          </div>
        )}

        {/* LOADING ANIMATION VIEW */}
        {view === "loading" && (
          <div className="py-16">
            <LoadingState />
          </div>
        )}

        {/* ERROR STATE VIEW */}
        {view === "error" && (
          <div className="py-16">
            <ErrorState
              message={error}
              onRetry={() => {
                if (preferences) {
                  generatePlan(preferences);
                } else {
                  setView("form");
                }
              }}
            />
          </div>
        )}

        {/* RESULTS RESULTS VIEW */}
        {view === "results" && plan && preferences && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Header Controls (Hidden on print) */}
            <div className="no-print bg-bg-card border border-border-color rounded-3xl p-6 sm:p-8 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
                  Generation Successful
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main mt-1">
                  Your Personalized Plan
                </h2>
                <p className="text-sm text-text-muted mt-1.5">
                  Plan designed for {preferences.peopleCount} {Number(preferences.peopleCount) === 1 ? "person" : "people"} ({preferences.dietaryPreference}, {preferences.cuisine} cuisine).
                </p>
              </div>

              {/* Utility Button Actions */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Print/PDF */}
                <button
                  onClick={handlePrint}
                  className="px-5 py-3.5 rounded-2xl border border-border-color bg-bg-card text-text-main font-semibold text-sm hover:bg-brand-green-soft hover:border-brand-green/30 hover:text-brand-green transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm"
                >
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
                      d="M6.72 13.82l-.24-2.206a4.823 4.823 0 010-.528l.24-2.208a.75.75 0 00-.735-.83H5.25a2.25 2.25 0 00-2.25 2.25v2.25a2.25 2.25 0 002.25 2.25h.735a.75.75 0 00.735-.83zM21 9v6a2.25 2.25 0 01-2.25 2.25h-.735a.75.75 0 01-.735-.83l.24-2.208a4.822 4.822 0 000-.528l-.24-2.206a.75.75 0 01.735-.83h.735A2.25 2.25 0 0121 9zM16.5 12h-9"
                    />
                  </svg>
                  Print / Download PDF
                </button>

                {/* Regenerate */}
                <button
                  onClick={handleRegenerate}
                  className="px-5 py-3.5 rounded-2xl bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-md shadow-brand-orange/10 hover:shadow-brand-orange/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 animate-spin-slow"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  Regenerate Plan
                </button>

                {/* Edit Prefs / Reset */}
                <button
                  onClick={handleReset}
                  className="px-5 py-3.5 rounded-2xl border border-border-color bg-bg-card text-text-main font-semibold text-sm hover:bg-brand-orange-soft hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  Edit Preferences
                </button>
              </div>
            </div>

            {/* Printable Only Title */}
            <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-4">
              <h1 className="text-3xl font-bold">CookSmart AI - Personalized Daily Plan</h1>
              <p className="text-sm text-gray-600 mt-2">
                Designed for {preferences.peopleCount} {Number(preferences.peopleCount) === 1 ? "person" : "people"} • {preferences.dietaryPreference} • {preferences.cuisine} Cuisine • Budget Target: ${preferences.budget}
              </p>
            </div>

            {/* MEAL PLAN CARDS GRID */}
            <div className="print-grid grid grid-cols-1 md:grid-cols-3 gap-6">
              <MealCard type="Breakfast" data={plan.breakfast} />
              <MealCard type="Lunch" data={plan.lunch} />
              <MealCard type="Dinner" data={plan.dinner} />
            </div>

            {/* SUB-SECTIONS GRID */}
            <div className="print-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: Budget & Substitutions */}
              <div className="space-y-6">
                <BudgetCard userBudget={preferences.budget} budgetAnalysis={plan.budget} />
                <SubstitutionsCard substitutions={plan.substitutions} />
              </div>

              {/* Right Column: Grocery List */}
              <div className="h-full">
                <GroceryList items={plan.grocery_list} key={plan.grocery_list.join(",")} />
              </div>
            </div>

            {/* COOKING TIMELINE SCHEDULE */}
            <div className="w-full">
              <Timeline todo={plan.todo} key={JSON.stringify(plan.todo)} />
            </div>

            {/* Reset Form Footer Link (No print) */}
            <div className="no-print flex justify-center pt-4">
              <button
                onClick={handleReset}
                className="text-sm font-semibold text-text-muted hover:text-brand-orange underline underline-offset-4 transition-colors cursor-pointer"
              >
                Clear plan and reset form parameters
              </button>
            </div>
          </div>
        )}
      </main>

      {/* App Footer */}
      <footer className="mt-auto py-6 border-t border-border-color no-print transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-text-muted">
          <p>© {new Date().getFullYear()} CookSmart AI. Created with React, Next.js, and OpenRouter API.</p>
        </div>
      </footer>
    </div>
  );
}
