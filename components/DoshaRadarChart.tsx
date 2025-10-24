
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { PatientProfile } from '../types';

interface DoshaRadarChartProps {
  patient: PatientProfile;
}

const DoshaRadarChart: React.FC<DoshaRadarChartProps> = ({ patient }) => {
  const data = [
    { subject: 'Vata', A: patient.vikriti.vata, fullMark: 10 },
    { subject: 'Pitta', A: patient.vikriti.pitta, fullMark: 10 },
    { subject: 'Kapha', A: patient.vikriti.kapha, fullMark: 10 },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#3D3D3D', fontSize: 14 }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tickCount={6} />
          <Radar name={patient.name} dataKey="A" stroke="#4A6A5C" fill="#6A8A7C" fillOpacity={0.6} />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ddd' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoshaRadarChart;
