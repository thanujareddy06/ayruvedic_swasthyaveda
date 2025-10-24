import React from 'react';
import { PatientProfile, DietPlan, FoodItem } from '../types';
import Card from './common/Card';
import DoshaRadarChart from './DoshaRadarChart';

interface AnalyticsDashboardProps {
  patient: PatientProfile;
  plan: DietPlan | null;
  foodDatabase: FoodItem[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ patient, plan, foodDatabase }) => {
  // Mock analytics for demonstration
  const nutrientRatio = { protein: 20, carbs: 55, fat: 25 };
  const energyBalance = 2200; // calories

  return (
    <Card>
      <h2 className="text-2xl font-bold font-serif text-brand-gold mb-4">Wellness Analytics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-brand-gold mb-2">Current Dosha Balance (Vikriti)</h3>
          <p className="text-brand-cream/80 mb-4 text-sm">This chart visualizes your current dosha levels. The goal of the diet plan is to bring these forces into a state of balance relative to your unique constitution (Prakriti).</p>
          <DoshaRadarChart patient={patient} />
        </div>
        <div className="space-y-6">
           <div>
              <h3 className="text-xl font-semibold text-brand-gold mb-2">AI-Powered Insight</h3>
               <div className="bg-brand-green/20 p-4 rounded-lg text-brand-green-light border border-white/10">
                <p className="font-bold">✨ AyurMind Suggestion:</p>
                <p className="text-sm text-brand-cream/90">Based on your increased Pitta, the generated plan emphasizes cooling and non-spicy foods like cucumber and basmati rice to pacify the fire element.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand-gold mb-2">Estimated Nutrient Ratio</h3>
              <div className="flex justify-between items-center bg-black/30 rounded-full h-8 p-1">
                  <div className="bg-blue-400/80 h-full rounded-l-full text-center text-white text-sm flex items-center justify-center" style={{ width: `${nutrientRatio.protein}%` }}>
                    P: {nutrientRatio.protein}%
                  </div>
                   <div className="bg-green-400/80 h-full text-center text-white text-sm flex items-center justify-center" style={{ width: `${nutrientRatio.carbs}%` }}>
                    C: {nutrientRatio.carbs}%
                  </div>
                   <div className="bg-red-400/80 h-full rounded-r-full text-center text-white text-sm flex items-center justify-center" style={{ width: `${nutrientRatio.fat}%` }}>
                    F: {nutrientRatio.fat}%
                  </div>
              </div>
          </div>
            <div>
                <h3 className="text-xl font-semibold text-brand-gold mb-2">Estimated Energy Balance</h3>
                 <div className="w-full bg-black/30 rounded-full h-4">
                  <div className="bg-brand-gold h-4 rounded-full" style={{ width: `${(energyBalance / 3000) * 100}%` }}></div>
                </div>
                <p className="text-right text-brand-cream/80 mt-1 text-sm">{energyBalance} kcal / day (estimated)</p>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default AnalyticsDashboard;