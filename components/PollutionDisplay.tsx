import React from 'react';
import { WeatherData } from '../types';
import { Translations } from '../i18n/i18n';
import { AirQualityIcon } from './icons/AirQualityIcon';

interface PollutionDisplayProps {
  data: WeatherData;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
}

const CircularProgress: React.FC<{ percentage: number; size?: number; strokeWidth?: number }> = ({
  percentage,
  size = 100,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  let progressColor = 'text-green-400'; // Default green
  if (percentage > 66) {
    progressColor = 'text-red-500'; // High chance - red
  } else if (percentage > 33) {
    progressColor = 'text-yellow-400'; // Moderate chance - yellow
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          className="text-white/20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={`${progressColor} transition-all duration-500 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from the top
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-white">{`${Math.round(percentage)}%`}</span>
      </div>
    </div>
  );
};


export const PollutionDisplay: React.FC<PollutionDisplayProps> = ({ data, t }) => {
  return (
    <div className="p-4 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* AQI Display */}
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center text-center">
          <div className="flex items-center text-sm text-sky-100 mb-1">
            <AirQualityIcon className="w-4 h-4" />
            <span className="ml-2 rtl:ml-0 rtl:mr-2">{t('airQualityIndex')}</span>
          </div>
          <p className="text-3xl font-semibold">
            {data.airPollutionIndex}
            {data.airPollutionIndex > 0 && t('aqiUnit') && <span className="text-lg ml-1 rtl:ml-0 rtl:mr-1">{t('aqiUnit')}</span>}
          </p>
        </div>

        {/* School Closure Chance */}
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center text-center">
           <h3 className="text-sm text-sky-100 mb-2">{t('schoolClosureChance')}</h3>
          <div
            role="progressbar"
            aria-valuenow={data.schoolClosureChance}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t('schoolClosureChance')}
          >
            <CircularProgress percentage={data.schoolClosureChance} size={100} strokeWidth={8} />
          </div>
        </div>
      </div>
    </div>
  );
};