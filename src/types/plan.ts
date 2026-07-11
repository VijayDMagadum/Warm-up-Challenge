export interface MealInfo {
  meal: string;
  ingredients: string[];
  time: string;
}

export interface BudgetInfo {
  estimated_cost: number;
  within_budget: boolean;
  savings_tips: string[];
}

export interface TodoItem {
  time: string;
  task: string;
}

export interface CookingPlan {
  breakfast: MealInfo;
  lunch: MealInfo;
  dinner: MealInfo;
  grocery_list: string[];
  substitutions: string[]; // Format: "Ingredient -> Substitution"
  budget: BudgetInfo;
  todo: TodoItem[];
}

export interface UserPreferences {
  budget: number;
  peopleCount: string;
  dietaryPreference: string;
  allergies: string[];
  cookingTime: string;
  availableIngredients: string;
  cuisine: string;
  difficulty: string;
}
