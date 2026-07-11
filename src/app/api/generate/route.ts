import { NextRequest, NextResponse } from "next/server";
import { UserPreferences } from "@/types/plan";

const OPENROUTER_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

// Define the response schema structure for the OpenRouter model.
const responseSchema = {
  type: "object",
  properties: {
    breakfast: {
      type: "object",
      additionalProperties: false,
      properties: {
        meal: { type: "string" },
        ingredients: {
          type: "array",
          items: { type: "string" }
        },
        time: { type: "string" }
      },
      required: ["meal", "ingredients", "time"]
    },
    lunch: {
      type: "object",
      additionalProperties: false,
      properties: {
        meal: { type: "string" },
        ingredients: {
          type: "array",
          items: { type: "string" }
        },
        time: { type: "string" }
      },
      required: ["meal", "ingredients", "time"]
    },
    dinner: {
      type: "object",
      additionalProperties: false,
      properties: {
        meal: { type: "string" },
        ingredients: {
          type: "array",
          items: { type: "string" }
        },
        time: { type: "string" }
      },
      required: ["meal", "ingredients", "time"]
    },
    grocery_list: {
      type: "array",
      items: { type: "string" }
    },
    substitutions: {
      type: "array",
      items: { type: "string" }
    },
    budget: {
      type: "object",
      additionalProperties: false,
      properties: {
        estimated_cost: { type: "number" },
        within_budget: { type: "boolean" },
        savings_tips: {
          type: "array",
          items: { type: "string" }
        }
      },
      required: ["estimated_cost", "within_budget", "savings_tips"]
    },
    todo: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          time: { type: "string" },
          task: { type: "string" }
        },
        required: ["time", "task"]
      }
    }
  },
  required: [
    "breakfast",
    "lunch",
    "dinner",
    "grocery_list",
    "substitutions",
    "budget",
    "todo"
  ],
  additionalProperties: false
} as const;

type OpenRouterChatResponse = {
  choices?: Array<{
    message?: {
      content?: OpenRouterMessageContent;
    };
  }>;
  error?: {
    message?: string;
  };
};

type OpenRouterMessageContent = string | Array<{ type?: string; text?: string }>;

function getMessageContent(content?: OpenRouterMessageContent) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => part.text)
      .filter(Boolean)
      .join("");
  }

  return "";
}

function parseJsonResponse(responseText: string) {
  const cleanedText = responseText
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");

  return JSON.parse(cleanedText);
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key is missing. Please configure OPENROUTER_API_KEY in your environment variables." },
        { status: 500 }
      );
    }

    const body: UserPreferences = await req.json();
    const {
      budget,
      peopleCount,
      dietaryPreference,
      allergies,
      cookingTime,
      availableIngredients,
      cuisine,
      difficulty
    } = body;

    // Validate inputs
    if (typeof budget !== "number" || budget <= 0) {
      return NextResponse.json({ error: "Invalid budget value provided." }, { status: 400 });
    }

    const prompt = `
You are an expert chef, nutritionist, and budget planner.
Generate a personalized daily cooking plan for a user with the following preferences:

- User's Budget: $${budget} (this is the budget for the groceries/meals for the number of people specified)
- Number of People: ${peopleCount}
- Dietary Preference: ${dietaryPreference}
- Allergies: ${allergies && allergies.length > 0 ? allergies.join(", ") : "None"}
- Available Cooking Time: ${cookingTime}
- Available Ingredients (already in the kitchen): ${availableIngredients || "None"}
- Cuisine Preference: ${cuisine}
- Meal Difficulty: ${difficulty}

Please design 3 cohesive meals (Breakfast, Lunch, and Dinner) for today that respect all dietary preferences and allergies.
Maximize the use of available ingredients to stay within the budget, and plan delicious, healthy dishes.
Calculate the estimated total grocery cost for the items needed that are NOT already available in the kitchen.
Compare this estimated cost with the user's budget. Set within_budget to true if estimated_cost <= user's budget ($${budget}), and false otherwise.
Provide practical savings tips to reduce the cost if the meals are over budget, or generic meal-prepping budget tips otherwise.
Provide helpful ingredient substitutions (e.g. "Milk -> Almond Milk", "Chicken -> Tofu") for common allergens or dietary preferences.
Create a step-by-step cooking to-do timeline (todo list) spanning the day (e.g., "8:00 AM", "12:00 PM", "6:30 PM") showing when to start preparing, what steps to take, and when the meal is ready.

Ensure the output conforms exactly to the JSON schema. All fields are required. Do not include markdown code block formatting in your JSON output.
`;

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "CookSmart AI"
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.2,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "cooking_plan",
            strict: true,
            schema: responseSchema
          }
        }
      })
    });

    const result = await openRouterResponse.json() as OpenRouterChatResponse;

    if (!openRouterResponse.ok) {
      throw new Error(result.error?.message || "OpenRouter request failed while generating your meal plan.");
    }

    const responseText = getMessageContent(result.choices?.[0]?.message?.content);
    if (!responseText) {
      throw new Error("Empty response received from OpenRouter API");
    }

    try {
      const planData = parseJsonResponse(responseText);
      return NextResponse.json(planData);
    } catch {
      throw new Error("OpenRouter returned an invalid JSON response. Please try again.");
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unable to generate your meal plan. Please try again.";
    console.error("OpenRouter API generation error:", error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
