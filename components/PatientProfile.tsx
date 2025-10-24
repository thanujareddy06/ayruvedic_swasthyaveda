import React from 'react';
import { PatientProfile as PatientProfileType } from '../types';
import Card from './common/Card';

interface PatientProfileProps {
  patient: PatientProfileType;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  return (
    <Card>
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold font-serif text-brand-gold">{patient.name}</h1>
          <p className="text-brand-cream/80 mt-1">{patient.age}, {patient.gender}</p>
          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
            {patient.dietaryRestrictions.map(restriction => (
              <span key={restriction} className="bg-brand-green/30 text-brand-green-light px-3 py-1 text-xs font-semibold rounded-full">
                {restriction}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex-1 w-full">
            <h3 className="text-lg font-semibold text-brand-gold mb-2">Health Goals</h3>
            <ul className="list-disc list-inside text-brand-cream space-y-1">
                {patient.healthGoals.map(goal => (
                    <li key={goal}>{goal}</li>
                ))}
            </ul>
        </div>
        <div className="mt-6 md:mt-0 flex-1 w-full">
             <h3 className="text-lg font-semibold text-brand-gold mb-2">Dosha Profile</h3>
             <div className="text-sm space-y-1 text-brand-cream">
                <p><strong>Prakriti (Constitution):</strong> V: {patient.prakriti.vata}, P: {patient.prakriti.pitta}, K: {patient.prakriti.kapha}</p>
                <p><strong>Vikriti (Current State):</strong> V: {patient.vikriti.vata}, P: {patient.vikriti.pitta}, K: {patient.vikriti.kapha}</p>
             </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientProfile;
