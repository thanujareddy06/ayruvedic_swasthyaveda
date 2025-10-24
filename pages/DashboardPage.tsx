import React from 'react';
import Header from '../components/Header';
import PatientProfile from '../components/PatientProfile';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import DietChart from '../components/DietChart';
import SeasonalTips from '../components/SeasonalTips';
import { MOCK_PATIENT, MOCK_FOOD_DATABASE } from '../constants';
import { DietPlan, Meal } from '../types';
import { generateDietPlan, generateRecipe } from '../services/geminiService';
import Button from '../components/common/Button';

type MealName = keyof DietPlan['plan'][0]['meals'];

const DashboardPage: React.FC = () => {
    const [patient] = React.useState(MOCK_PATIENT);
    const [dietPlan, setDietPlan] = React.useState<DietPlan | null>(null);
    const [isLoadingPlan, setIsLoadingPlan] = React.useState(false);
    const [planError, setPlanError] = React.useState<string | null>(null);

    const [recipes, setRecipes] = React.useState<Record<string, Record<string, string>>>({});
    const [recipeLoadingState, setRecipeLoadingState] = React.useState<Record<string, Record<string, boolean>>>({});
    const [recipeErrorState, setRecipeErrorState] = React.useState<Record<string, Record<string, string | null>>>({});

    const handleGeneratePlan = async () => {
        setIsLoadingPlan(true);
        setPlanError(null);
        setDietPlan(null);
        try {
            const plan = await generateDietPlan(patient);
            setDietPlan(plan);
        } catch (error) {
            console.error(error);
            setPlanError("Failed to generate diet plan. Please try again.");
        } finally {
            setIsLoadingPlan(false);
        }
    };

    const handleGenerateRecipe = async (day: string, mealKey: MealName, meal: Meal) => {
        setRecipeLoadingState(prev => ({ ...prev, [day]: { ...prev[day], [mealKey]: true } }));
        setRecipeErrorState(prev => ({ ...prev, [day]: { ...prev[day], [mealKey]: null } }));
        try {
            const recipe = await generateRecipe(meal);
            setRecipes(prev => ({ ...prev, [day]: { ...prev[day], [mealKey]: recipe } }));
        } catch (error) {
            console.error(error);
            setRecipeErrorState(prev => ({ ...prev, [day]: { ...prev[day], [mealKey]: "Failed to generate recipe." } }));
        } finally {
            setRecipeLoadingState(prev => ({ ...prev, [day]: { ...prev[day], [mealKey]: false } }));
        }
    };


    return (
        <>
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <PatientProfile patient={patient} />
                <div className="mt-8 text-center">
                    <Button
                        onClick={handleGeneratePlan}
                        isLoading={isLoadingPlan}
                        className="bg-brand-gold hover:bg-brand-gold/80 text-brand-text text-lg"
                    >
                        {dietPlan ? 'Regenerate Wellness Plan' : 'Generate My Wellness Plan'}
                    </Button>
                </div>
                {planError && <p className="text-red-400 text-center mt-4">{planError}</p>}
                
                {isLoadingPlan && (
                     <div className="flex justify-center items-center mt-8">
                        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-brand-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xl text-brand-gold font-serif">Crafting your personalized plan...</span>
                    </div>
                )}

                {dietPlan && (
                    <>
                        <div className="mt-8">
                            <AnalyticsDashboard patient={patient} plan={dietPlan} foodDatabase={MOCK_FOOD_DATABASE} />
                        </div>
                        <DietChart
                            plan={dietPlan}
                            recipes={recipes}
                            recipeLoadingState={recipeLoadingState}
                            recipeErrorState={recipeErrorState}
                            onGenerateRecipe={handleGenerateRecipe}
                        />
                        <SeasonalTips />
                    </>
                )}
            </main>
        </>
    );
};

export default DashboardPage;
