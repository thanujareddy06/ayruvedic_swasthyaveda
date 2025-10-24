import { PatientProfile, FoodItem } from './types';

export const MOCK_PATIENT: PatientProfile = {
  name: 'Jane Doe',
  age: 32,
  gender: 'Female',
  weight: 65,
  height: 168,
  dietaryRestrictions: ['vegetarian', 'gluten-free'],
  healthGoals: ['improve digestion', 'increase energy', 'reduce stress'],
  prakriti: { vata: 5, pitta: 8, kapha: 3 },
  vikriti: { vata: 4, pitta: 9, kapha: 5 },
};

export const MOCK_FOOD_DATABASE: FoodItem[] = [
    { id: 1, name: 'Basmati Rice', category: 'grain', doshaEffect: { vata: 'pacifying', pitta: 'pacifying', kapha: 'aggravating' } },
    { id: 2, name: 'Cucumber', category: 'vegetable', doshaEffect: { vata: 'aggravating', pitta: 'pacifying', kapha: 'pacifying' } },
    { id: 3, name: 'Mung Beans', category: 'protein', doshaEffect: { vata: 'pacifying', pitta: 'pacifying', kapha: 'pacifying' } },
    { id: 4, name: 'Ghee', category: 'dairy', doshaEffect: { vata: 'pacifying', pitta: 'pacifying', kapha: 'neutral' } },
    { id: 5, name: 'Turmeric', category: 'spice', doshaEffect: { vata: 'pacifying', pitta: 'pacifying', kapha: 'pacifying' } },
    { id: 6, name: 'Spinach', category: 'vegetable', doshaEffect: { vata: 'aggravating', pitta: 'neutral', kapha: 'neutral' } },
];
