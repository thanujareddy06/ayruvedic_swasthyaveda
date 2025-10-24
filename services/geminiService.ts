import { GoogleGenAI, Type } from "@google/genai";
import { PatientProfile, DietPlan, Meal } from "../types";

// FIX: Initialize GoogleGenAI with apiKey from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const dietPlanSchema = {
    type: Type.OBJECT,
    properties: {
        plan: {
            type: Type.ARRAY,
            description: "A 3-day meal plan array.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "e.g., 'Day 1'" },
                    meals: {
                        type: Type.OBJECT,
                        properties: {
                            breakfast: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    foods: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    ayurvedicReasoning: { type: Type.STRING },
                                    nutritionalReasoning: { type: Type.STRING },
                                },
                                required: ["name", "foods", "ayurvedicReasoning", "nutritionalReasoning"]
                            },
                            lunch: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    foods: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    ayurvedicReasoning: { type: Type.STRING },
                                    nutritionalReasoning: { type: Type.STRING },
                                },
                                required: ["name", "foods", "ayurvedicReasoning", "nutritionalReasoning"]
                            },
                            dinner: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    foods: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    ayurvedicReasoning: { type: Type.STRING },
                                    nutritionalReasoning: { type: Type.STRING },
                                },
                                required: ["name", "foods", "ayurvedicReasoning", "nutritionalReasoning"]
                            },
                            snack: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    foods: { type: Type.ARRAY, items: { type: Type.STRING } },
                                    ayurvedicReasoning: { type: Type.STRING },
                                    nutritionalReasoning: { type: Type.STRING },
                                },
                            },
                        },
                        required: ["breakfast", "lunch", "dinner"]
                    },
                    dailySummary: { type: Type.STRING, description: "A summary of how the day's meals support the patient's goals." },
                },
                required: ["day", "meals", "dailySummary"]
            },
        },
    },
    required: ["plan"],
};


export const generateDietPlan = async (patient: PatientProfile): Promise<DietPlan> => {
    const prompt = `
        Create a personalized 3-day Ayurvedic diet plan for the following individual.
        The goal is to balance their doshas, moving from their current state (Vikriti) towards their natural constitution (Prakriti).
        
        Patient Profile:
        - Name: ${patient.name}
        - Age: ${patient.age}
        - Gender: ${patient.gender}
        - Weight: ${patient.weight} kg
        - Height: ${patient.height} cm
        - Prakriti (Constitution): Vata ${patient.prakriti.vata}, Pitta ${patient.prakriti.pitta}, Kapha ${patient.prakriti.kapha}
        - Vikriti (Current Imbalance): Vata ${patient.vikriti.vata}, Pitta ${patient.vikriti.pitta}, Kapha ${patient.vikriti.kapha}
        - Dietary Restrictions: ${patient.dietaryRestrictions.join(', ')}
        - Health Goals: ${patient.healthGoals.join(', ')}

        Instructions:
        1. Generate a plan for 3 days.
        2. For each day, provide meals for breakfast, lunch, and dinner. An optional healthy snack can be included.
        3. For each meal, provide a creative name, a list of foods, a brief Ayurvedic reasoning (why it's good for their dosha balance), and a brief nutritional reasoning.
        4. For each day, provide a daily summary explaining how the meals collectively support the patient's wellness goals.
        5. The response must be in JSON format, adhering to the provided schema.
    `;

    // FIX: Use ai.models.generateContent instead of a deprecated method.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: dietPlanSchema,
        }
    });

    // FIX: Access response text directly.
    const jsonText = response.text;
    try {
        const parsedPlan = JSON.parse(jsonText);
        // Basic validation
        if (parsedPlan && Array.isArray(parsedPlan.plan)) {
            return parsedPlan as DietPlan;
        } else {
            throw new Error("Invalid diet plan structure received from API.");
        }
    } catch (error) {
        console.error("Error parsing diet plan JSON:", error);
        throw new Error("Failed to parse the diet plan from the AI response.");
    }
};

export const generateRecipe = async (meal: Meal): Promise<string> => {
    const prompt = `
        Generate a simple, step-by-step recipe for the following meal: "${meal.name}".
        The ingredients are: ${meal.foods.join(', ')}.
        Provide instructions on how to prepare it. Keep it concise.
        Format the response in Markdown with a heading for the recipe name, and bullet points for ingredients and instructions.
    `;

    // FIX: Use ai.models.generateContent.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    // FIX: Access response text directly.
    return response.text;
};
