export interface DoshaScores {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  weight: number; // in kg
  height: number; // in cm
  dietaryRestrictions: string[];
  healthGoals: string[];
  prakriti: DoshaScores; // Constitution
  vikriti: DoshaScores;  // Current state
}

export interface Meal {
  name: string;
  foods: string[];
  ayurvedicReasoning: string;
  nutritionalReasoning: string;
}

export interface DailyPlan {
  day: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snack?: Meal;
  };
  dailySummary: string;
}

export interface DietPlan {
  plan: DailyPlan[];
}

export interface FoodItem {
  id: number;
  name: string;
  category: 'fruit' | 'vegetable' | 'grain' | 'protein' | 'dairy' | 'spice' | 'other';
  doshaEffect: {
    vata: 'pacifying' | 'aggravating' | 'neutral';
    pitta: 'pacifying' | 'aggravating' | 'neutral';
    kapha: 'pacifying' | 'aggravating' | 'neutral';
  };
}
