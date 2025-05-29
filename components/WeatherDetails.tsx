import React from 'react';
import { WeatherData } from '../types';
import { ThermometerIcon, DropletIcon, WindIcon, PrecipitationIcon } from './icons/DetailWeatherIcons';
import { Translations } from '../i18n/i18n'; // For t function signature

interface WeatherDetailsProps {
  data: WeatherData;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
}

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, unit }) => (
  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex flex-col items-center text-center text-white">
    <div className="flex items-center text-sm text-sky-100 mb-1">
      {icon}
      <span className="ml-2 rtl:ml-0 rtl:mr-2">{label}</span>
    </div>
    <p className="text-2xl font-semibold">
      {value}
      {unit && <span className="text-lg ml-1 rtl:ml-0 rtl:mr-1">{unit}</span>}
    </p>
  </div>
);

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, t }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <DetailItem
          icon={<ThermometerIcon className="w-4 h-4" />}
          label={t('feelsLike')}
          value={Math.round(data.feelsLike)}
          unit="°"
        />
        <DetailItem
          icon={<DropletIcon className="w-4 h-4" />}
          label={t('humidity')}
          value={data.humidity}
          unit="%"
        />
        <DetailItem
          icon={<WindIcon className="w-4 h-4" />}
          label={t('wind')}
          value={data.windSpeed}
          unit={t('windUnit')}
        />
        <DetailItem
          icon={<PrecipitationIcon className="w-4 h-4" />}
          label={t('precipitation')}
          value={data.precipitationChance}
          unit="%"
        />
      </div>
    </div>
  );
};