import React from 'react';
import { DailyPlan, DietPlan, Meal } from '../types';
import Card from './common/Card';
import Button from './common/Button';

type MealName = keyof DailyPlan['meals'];

interface MealCardProps {
    mealName: string;
    meal: Meal | undefined;
    day: string;
    mealKey: MealName;
    recipe?: string;
    isLoading?: boolean;
    error?: string | null;
    onGenerateRecipe: (day: string, mealKey: MealName, meal: Meal) => void;
}

const MealCard: React.FC<MealCardProps> = ({ mealName, meal, day, mealKey, recipe, isLoading, error, onGenerateRecipe }) => {
    if (!meal) return null;

    const handleGenerateClick = () => {
        onGenerateRecipe(day, mealKey, meal);
    };

    return (
        <div className="bg-brand-green/10 p-4 rounded-lg border border-white/10 transition-all">
            <h4 className="font-bold text-lg text-brand-gold font-serif">{meal.name} <span className="text-sm font-sans text-brand-cream/70">({mealName})</span></h4>
            <p className="font-semibold text-brand-cream/90 mt-2">Foods: <span className="font-normal">{Array.isArray(meal.foods) ? meal.foods.join(', ') : 'No specific foods listed.'}</span></p>
            <div className="mt-3 text-sm space-y-2">
                <p><strong className="text-brand-green-light">Ayurvedic Insight:</strong> {meal.ayurvedicReasoning}</p>
                <p><strong className="text-brand-green-light/80">Nutritional Insight:</strong> {meal.nutritionalReasoning}</p>
            </div>
            <div className="mt-4">
                {isLoading ? (
                     <div className="flex items-center text-brand-gold/80">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating Recipe...</span>
                    </div>
                ) : error ? (
                    <p className="text-red-400 text-sm">Error: {error}</p>
                ) : recipe ? (
                    <div className="bg-black/20 p-3 rounded-md prose prose-invert prose-sm">
                       <div className="whitespace-pre-wrap font-sans" dangerouslySetInnerHTML={{ __html: recipe.replace(/# (.*)/g, '<h5 class="font-serif text-brand-cream text-base">$1</h5>').replace(/\* (.*)/g, '<li>$1</li>') }} />
                    </div>
                ) : (
                    <Button
                        onClick={handleGenerateClick}
                        className="bg-brand-gold/80 hover:bg-brand-gold text-brand-text px-4 py-2 text-sm"
                    >
                        Generate Recipe
                    </Button>
                )}
            </div>
        </div>
    );
};


interface DietChartProps {
  plan: DietPlan | null;
  recipes: Record<string, Record<string, string>>;
  recipeLoadingState: Record<string, Record<string, boolean>>;
  recipeErrorState: Record<string, Record<string, string | null>>;
  onGenerateRecipe: (day: string, mealKey: MealName, meal: Meal) => void;
}

const DietChart: React.FC<DietChartProps> = ({ plan, recipes, recipeLoadingState, recipeErrorState, onGenerateRecipe }) => {
  if (!plan) return null;

  return (
    <Card className="mt-8">
      <h2 className="text-3xl font-bold font-serif text-brand-gold mb-6 text-center">Your 3-Day Personalized Wellness Plan</h2>
      <div className="space-y-8">
        {plan.plan.map((dailyPlan) => (
          <div key={dailyPlan.day} className="bg-black/10 p-6 rounded-xl shadow-lg border border-brand-gold/20">
            <h3 className="text-2xl font-semibold font-serif text-brand-gold mb-4">{dailyPlan.day}</h3>
            <div className="space-y-4">
                <MealCard
                    mealName="Breakfast"
                    mealKey="breakfast"
                    meal={dailyPlan.meals.breakfast}
                    day={dailyPlan.day}
                    onGenerateRecipe={onGenerateRecipe}
                    recipe={recipes[dailyPlan.day]?.breakfast}
                    isLoading={recipeLoadingState[dailyPlan.day]?.breakfast}
                    error={recipeErrorState[dailyPlan.day]?.breakfast}
                />
                <MealCard
                    mealName="Lunch"
                    mealKey="lunch"
                    meal={dailyPlan.meals.lunch}
                    day={dailyPlan.day}
                    onGenerateRecipe={onGenerateRecipe}
                    recipe={recipes[dailyPlan.day]?.lunch}
                    isLoading={recipeLoadingState[dailyPlan.day]?.lunch}
                    error={recipeErrorState[dailyPlan.day]?.lunch}
                />
                <MealCard
                    mealName="Dinner"
                    mealKey="dinner"
                    meal={dailyPlan.meals.dinner}
                    day={dailyPlan.day}
                    onGenerateRecipe={onGenerateRecipe}
                    // FIX: Changed `daily.day` to `dailyPlan.day` to correctly reference the current day's plan.
                    recipe={recipes[dailyPlan.day]?.dinner}
                    isLoading={recipeLoadingState[dailyPlan.day]?.dinner}
                    error={recipeErrorState[dailyPlan.day]?.dinner}
                />
                {dailyPlan.meals.snack && (
                    <MealCard
                        mealName="Snack"
                        mealKey="snack"
                        meal={dailyPlan.meals.snack}
                        day={dailyPlan.day}
                        onGenerateRecipe={onGenerateRecipe}
                        recipe={recipes[dailyPlan.day]?.snack}
                        isLoading={recipeLoadingState[dailyPlan.day]?.snack}
                        error={recipeErrorState[dailyPlan.day]?.snack}
                    />
                )}
            </div>
            <div className="mt-6 bg-brand-green/20 p-4 rounded-lg">
                <p className="font-semibold text-brand-green-light">Daily Summary:</p>
                <p className="text-brand-cream/90 mt-1">{dailyPlan.dailySummary}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DietChart;