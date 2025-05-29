
import React from 'react';
import { WeatherData, WeatherCondition } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Translations } from '../i18n/i18n'; // For t function signature

interface CurrentWeatherDisplayProps {
  data: WeatherData;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
  tCondition: (conditionKey: string) => string;
}

const getPrecipitationTypeKey = (condition: WeatherCondition): keyof Translations => {
  if (condition === WeatherCondition.RAINY) return "rain";
  if (condition === WeatherCondition.SNOWY) return "snow";
  return "precipitation"; // General term, or could be specific like "showers" for THUNDERSTORM if needed
};

export const CurrentWeatherDisplay: React.FC<CurrentWeatherDisplayProps> = ({ data, t, tCondition }) => {
  const precipitationType = t(getPrecipitationTypeKey(data.condition));
  const formattedCondition = tCondition(data.condition);

  return (
    <div className="flex flex-col items-center text-white py-8 px-4 text-center">
      <h2 className="text-3xl font-medium">{data.locationName}</h2>
      <div className="mt-2 mb-1">
        <WeatherIcon condition={data.condition} className="w-32 h-32 sm:w-40 sm:h-40 mx-auto" />
      </div>
      <p className="text-7xl sm:text-8xl font-thin tracking-tight -mt-2">
        {Math.round(data.temperature)}°
      </p>
      <p className="text-xl font-medium capitalize">{formattedCondition}</p>
      <div className="flex space-x-4 rtl:space-x-reverse text-lg mt-1">
        <span>{t('highAbbr')}:{Math.round(data.highTemp)}°</span>
        <span>{t('lowAbbr')}:{Math.round(data.lowTemp)}°</span>
      </div>
      {data.precipitationChance > 5 && (
         <p className="text-sm mt-3 text-sky-100">
           {t('precipitationChanceText', { chance: data.precipitationChance, type: precipitationType })}
         </p>
      )}
    </div>
  );
};
