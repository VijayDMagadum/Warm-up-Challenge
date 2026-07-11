"use client";

import React from "react";
import { BudgetInfo } from "@/types/plan";

interface BudgetCardProps {
  userBudget: number;
  budgetAnalysis: BudgetInfo;
}

export default function BudgetCard({ userBudget, budgetAnalysis }: BudgetCardProps) {
  const estimatedCost = budgetAnalysis.estimated_cost;
  const isWithinBudget = budgetAnalysis.within_budget;
  const remaining = userBudget - estimatedCost;

  // Calculate percentage of budget used (cap at 100 for progress bar)
  const budgetPercentage = Math.min((estimatedCost / userBudget) * 100, 100);

  return (
    <div className="print-card bg-bg-card border border-border-color rounded-3xl p-6 sm:p-8 shadow-premium hover:shadow-md transition-all duration-200">
      <div className="border-b border-border-color pb-4 mb-6">
        <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
          <span>💰</span> Budget Analysis
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Review estimated cost feasibility based on ingredients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* User Budget */}
        <div className="p-4.5 rounded-2xl bg-bg-app border border-border-color">
          <span className="block text-xs font-bold uppercase tracking-wider text-text-muted">
            Your Target Budget
          </span>
          <span className="block text-2xl font-extrabold text-text-main mt-1">
            ${userBudget.toFixed(2)}
          </span>
        </div>

        {/* Estimated Cost */}
        <div className="p-4.5 rounded-2xl bg-bg-app border border-border-color">
          <span className="block text-xs font-bold uppercase tracking-wider text-text-muted">
            Estimated Cost
          </span>
          <span className="block text-2xl font-extrabold text-text-main mt-1">
            ${estimatedCost.toFixed(2)}
          </span>
        </div>

        {/* Status / Remaining */}
        <div className={`p-4.5 rounded-2xl border ${
          isWithinBudget
            ? "bg-brand-green/5 border-brand-green/20"
            : "bg-brand-orange/5 border-brand-orange/20"
        }`}>
          <div className="flex items-center justify-between">
            <span className="block text-xs font-bold uppercase tracking-wider text-text-muted">
              {remaining >= 0 ? "Budget Surplus" : "Over Budget"}
            </span>
            {/* Status Badge */}
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isWithinBudget
                ? "bg-brand-green text-white"
                : "bg-brand-orange text-white"
            }`}>
              {isWithinBudget ? "Within Budget" : "Over Budget"}
            </span>
          </div>
          <span className={`block text-2xl font-extrabold mt-1 ${
            remaining >= 0 ? "text-brand-green" : "text-brand-orange"
          }`}>
            {remaining >= 0 ? `+$${remaining.toFixed(2)}` : `-$${Math.abs(remaining).toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Visual Budget Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-semibold text-text-muted mb-2">
          <span>Budget Used</span>
          <span>{((estimatedCost / userBudget) * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-border-color overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isWithinBudget ? "bg-brand-green" : "bg-brand-orange"
            }`}
            style={{ width: `${budgetPercentage}%` }}
          />
        </div>
      </div>

      {/* Savings Tips & Suggestions */}
      {budgetAnalysis.savings_tips && budgetAnalysis.savings_tips.length > 0 && (
        <div className={`p-5 rounded-2xl border ${
          isWithinBudget
            ? "bg-bg-app border-border-color"
            : "bg-brand-orange/5 border-brand-orange/10"
        }`}>
          <h4 className="text-sm font-bold text-text-main flex items-center gap-2 mb-3">
            <span>💡</span> {isWithinBudget ? "AI Meal Prepping Tips" : "AI Cost Saving Recommendations"}
          </h4>
          <ul className="space-y-2">
            {budgetAnalysis.savings_tips.map((tip, index) => (
              <li key={index} className="text-sm text-text-muted flex items-start gap-2.5">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${
                  isWithinBudget ? "bg-brand-green" : "bg-brand-orange"
                }`} />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
