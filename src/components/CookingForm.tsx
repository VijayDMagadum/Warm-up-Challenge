"use client";

import React, { useState } from "react";
import { UserPreferences } from "@/types/plan";

interface CookingFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading: boolean;
  initialPreferences?: UserPreferences;
}

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Non-Vegetarian",
  "Keto",
  "High Protein",
  "Gluten Free"
];

const PEOPLE_OPTIONS = ["1", "2", "3", "4", "5+"];

const TIME_OPTIONS = ["15 minutes", "30 minutes", "45 minutes", "60+ minutes"];

const CUISINE_OPTIONS = [
  "Indian",
  "Italian",
  "Mexican",
  "Chinese",
  "American",
  "Mediterranean"
];

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Advanced"];

const ALLERGY_OPTIONS = ["Nuts", "Dairy", "Eggs", "Soy", "Seafood"];

export default function CookingForm({ onSubmit, isLoading, initialPreferences }: CookingFormProps) {
  const defaultPrefs: UserPreferences = {
    budget: 25,
    peopleCount: "2",
    dietaryPreference: "Non-Vegetarian",
    allergies: [],
    cookingTime: "30 minutes",
    availableIngredients: "",
    cuisine: "Mediterranean",
    difficulty: "Medium"
  };

  const [prefs, setPrefs] = useState<UserPreferences>(initialPreferences || defaultPrefs);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPrefs((prev) => ({
      ...prev,
      [name]: name === "budget" ? (value === "" ? "" : Number(value)) : value
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setPrefs((prev) => {
      const isSelected = prev.allergies.includes(allergy);
      const newAllergies = isSelected
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy];
      return { ...prev, allergies: newAllergies };
    });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setPrefs(defaultPrefs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prefs.budget || prefs.budget <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }
    onSubmit(prefs);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-bg-card border border-border-color rounded-3xl p-6 sm:p-10 shadow-premium transition-all duration-300">
      <div className="border-b border-border-color pb-6 mb-8">
        <h2 className="text-2xl font-bold text-text-main">Customize Your Meal Plan</h2>
        <p className="text-sm text-text-muted mt-1">
          Tell CookSmart AI about your dietary choices, allergies, budget, and ingredients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Budget Input */}
          <div>
            <label htmlFor="budget" className="block text-sm font-semibold text-text-main mb-2">
              Budget Target (USD)
            </label>
            <div className="relative rounded-2xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-text-muted text-base">$</span>
              </div>
              <input
                type="number"
                name="budget"
                id="budget"
                required
                min="1"
                placeholder="25"
                value={prefs.budget}
                onChange={handleChange}
                disabled={isLoading}
                className="block w-full rounded-2xl border border-border-color bg-bg-card py-3.5 pl-9 pr-4 text-text-main placeholder-text-muted/50 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-base transition-colors"
              />
            </div>
            <p className="text-xs text-text-muted mt-1.5">
              The targeted grocery cost for your planned meals today.
            </p>
          </div>

          {/* Number of People */}
          <div>
            <label htmlFor="peopleCount" className="block text-sm font-semibold text-text-main mb-2">
              Number of People
            </label>
            <select
              name="peopleCount"
              id="peopleCount"
              value={prefs.peopleCount}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full rounded-2xl border border-border-color bg-bg-card py-3.5 px-4 text-text-main focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-base transition-colors cursor-pointer"
            >
              {PEOPLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} {opt === "1" ? "Person" : "People"}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Preference */}
          <div>
            <label htmlFor="dietaryPreference" className="block text-sm font-semibold text-text-main mb-2">
              Dietary Preference
            </label>
            <select
              name="dietaryPreference"
              id="dietaryPreference"
              value={prefs.dietaryPreference}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full rounded-2xl border border-border-color bg-bg-card py-3.5 px-4 text-text-main focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-base transition-colors cursor-pointer"
            >
              {DIETARY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Available Cooking Time */}
          <div>
            <label htmlFor="cookingTime" className="block text-sm font-semibold text-text-main mb-2">
              Available Cooking Time
            </label>
            <select
              name="cookingTime"
              id="cookingTime"
              value={prefs.cookingTime}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full rounded-2xl border border-border-color bg-bg-card py-3.5 px-4 text-text-main focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-base transition-colors cursor-pointer"
            >
              {TIME_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} max
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Cuisine Preference */}
          <div>
            <label htmlFor="cuisine" className="block text-sm font-semibold text-text-main mb-2">
              Cuisine Preference
            </label>
            <select
              name="cuisine"
              id="cuisine"
              value={prefs.cuisine}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full rounded-2xl border border-border-color bg-bg-card py-3.5 px-4 text-text-main focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-base transition-colors cursor-pointer"
            >
              {CUISINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Meal Difficulty */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-semibold text-text-main mb-2">
              Meal Difficulty
            </label>
            <select
              name="difficulty"
              id="difficulty"
              value={prefs.difficulty}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full rounded-2xl border border-border-color bg-bg-card py-3.5 px-4 text-text-main focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-base transition-colors cursor-pointer"
            >
              {DIFFICULTY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients Already Available */}
          <div>
            <label htmlFor="availableIngredients" className="block text-sm font-semibold text-text-main mb-2">
              Ingredients Already Available
            </label>
            <textarea
              name="availableIngredients"
              id="availableIngredients"
              rows={3}
              placeholder="Rice&#10;Eggs&#10;Tomatoes&#10;Milk&#10;Onions"
              value={prefs.availableIngredients}
              onChange={handleChange}
              disabled={isLoading}
              className="block w-full rounded-2xl border border-border-color bg-bg-card py-3.5 px-4 text-text-main placeholder-text-muted/40 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-base transition-colors resize-y min-h-[100px]"
            />
            <p className="text-xs text-text-muted mt-1.5">
              Enter one ingredient per line. The AI will prioritize these items to reduce costs.
            </p>
          </div>
        </div>
      </div>

      {/* Allergies - Full Width Grid chips */}
      <div className="mt-8">
        <span className="block text-sm font-semibold text-text-main mb-3">
          Allergies / Intolerances
        </span>
        <div className="flex flex-wrap gap-3">
          {ALLERGY_OPTIONS.map((allergy) => {
            const isSelected = prefs.allergies.includes(allergy);
            return (
              <button
                key={allergy}
                type="button"
                onClick={() => toggleAllergy(allergy)}
                disabled={isLoading}
                className={`px-4.5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-brand-green-soft border-brand-green text-brand-green shadow-sm"
                    : "bg-bg-card border-border-color text-text-muted hover:border-brand-green/30 hover:text-text-main"
                }`}
              >
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
                {allergy}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-text-muted mt-2">
          Select any allergies. The AI will omit these and suggest suitable substitutes.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-10 pt-6 border-t border-border-color flex flex-col sm:flex-row items-center justify-end gap-4">
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-border-color text-text-main font-semibold text-base hover:bg-brand-orange-soft hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
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
          Reset Form
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-green hover:bg-brand-green-hover text-white font-semibold text-base transition-all duration-200 cursor-pointer shadow-md shadow-brand-green/10 hover:shadow-brand-green/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating Plan...
            </>
          ) : (
            <>
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
                  d="M9.813 15.904L9 21l8.982-11.795H11.25V3L3 14.806h8.062L9.813 15.904z"
                />
              </svg>
              Generate My Plan
            </>
          )}
        </button>
      </div>
    </form>
  );
}
