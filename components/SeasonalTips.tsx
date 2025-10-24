import React from 'react';
import Card from './common/Card';

const SeasonalTips: React.FC = () => {
    // This could be dynamic based on current season, or fetched from an AI call
    const tip = {
        season: "Pitta Season (Summer)",
        advice: "Focus on cooling foods like cucumber, mint, and coconut. Avoid spicy, oily, and sour foods. Stay hydrated and practice calming activities to balance the fire element.",
    };

    return (
        <Card className="mt-8">
            <h3 className="text-2xl font-semibold font-serif text-brand-gold mb-3">Seasonal Wellness Tip</h3>
            <div className="bg-brand-green/20 p-4 rounded-lg border border-white/10">
                <p className="font-bold text-lg text-brand-green-light">{tip.season}</p>
                <p className="text-brand-cream/90 mt-2">{tip.advice}</p>
            </div>
        </Card>
    );
};

export default SeasonalTips;
