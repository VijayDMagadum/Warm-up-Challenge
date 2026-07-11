"use client";

import React, { useState } from "react";
import { TodoItem } from "@/types/plan";

interface TimelineProps {
  todo: TodoItem[];
}

export default function Timeline({ todo }: TimelineProps) {
  const [completedSteps, setCompletedSteps] = useState<{ [key: number]: boolean }>({});

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="print-card bg-bg-card border border-border-color rounded-3xl p-6 sm:p-8 shadow-premium hover:shadow-md transition-all duration-200">
      <div className="border-b border-border-color pb-4 mb-6 no-print">
        <h3 className="text-xl font-bold text-text-main flex items-center gap-2">
          <span>📅</span> Cooking To-Do Timeline
        </h3>
        <p className="text-xs text-text-muted mt-0.5">
          Follow these time-blocked tasks to organize your cooking day. Click to check off tasks.
        </p>
      </div>

      {/* Printable Header */}
      <h3 className="text-lg font-bold text-black hidden print:block mb-4">
        📅 Cooking To-Do Timeline
      </h3>

      {todo && todo.length > 0 ? (
        <div className="relative pl-6 sm:pl-8 space-y-6">
          {/* Vertical joining line */}
          <div className="absolute top-2 bottom-2 left-[11px] sm:left-[15px] w-0.5 border-l-2 border-dashed border-border-color timeline-line" />

          {todo.map((item, index) => {
            const isCompleted = !!completedSteps[index];

            return (
              <div
                key={index}
                onClick={() => toggleStep(index)}
                className={`relative flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 cursor-pointer select-none transition-opacity duration-200 group ${
                  isCompleted ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* Timeline Node Dot */}
                <div
                  className={`absolute -left-[20px] sm:-left-[24px] w-5 h-5 sm:w-6.5 sm:h-6.5 rounded-full border-2 flex items-center justify-center transition-all duration-200 timeline-dot ${
                    isCompleted
                      ? "border-brand-green bg-brand-green text-white scale-90"
                      : "border-brand-orange bg-bg-card text-brand-orange group-hover:border-brand-orange-hover scale-100"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-orange" />
                  )}
                </div>

                {/* Time Indicator */}
                <div className="flex-shrink-0 min-w-[80px]">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                    isCompleted
                      ? "bg-brand-green-soft text-brand-green"
                      : "bg-brand-orange-soft text-brand-orange"
                  }`}>
                    {item.time || "Schedule"}
                  </span>
                </div>

                {/* Task Details */}
                <div className="flex-1">
                  <p className={`text-sm font-semibold leading-relaxed transition-all ${
                    isCompleted ? "line-through text-text-muted" : "text-text-main"
                  }`}>
                    {item.task}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-text-muted italic text-center py-6">
          No steps generated for the timeline.
        </p>
      )}
    </div>
  );
}
