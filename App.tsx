
import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData, WeatherCondition } from './types';
import { fetchWeatherData } from './services/weatherService';
import { CurrentWeatherDisplay } from './components/CurrentWeatherDisplay';
import { WeatherDetails } from './components/WeatherDetails';
import { PollutionDisplay } from './components/PollutionDisplay';
import { RefreshIcon } from './components/icons/RefreshIcon';
import { useTranslations, Language } from './i18n/i18n';

const getDynamicBackgroundClasses = (data: WeatherData | null): string => {
  if (!data) {
    return 'from-sky-500 via-blue-600 to-indigo-700'; // Default gradient
  }

  // AQI takes precedence for background
  // WeatherAPI us-epa-index: 1=Good, 2=Moderate, 3=Unhealthy for sensitive, 4=Unhealthy, 5=Very Unhealthy, 6=Hazardous
  if (data.airPollutionIndex >= 4) { // Unhealthy or worse
    return 'from-gray-400 via-yellow-600/50 to-red-700/50'; // Hazy, polluted look
  }
  if (data.airPollutionIndex === 3) { // Unhealthy for sensitive groups
    return 'from-sky-400 via-orange-400/50 to-yellow-500/50'; // Slightly hazy
  }

  switch (data.condition) {
    case WeatherCondition.SUNNY:
      return 'from-sky-400 via-cyan-400 to-blue-500';
    case WeatherCondition.PARTLY_CLOUDY:
      return 'from-sky-500 via-blue-500 to-gray-400';
    case WeatherCondition.CLOUDY:
      return 'from-slate-400 via-gray-500 to-slate-600';
    case WeatherCondition.MIST:
      return 'from-slate-300 via-gray-400 to-sky-300';
    case WeatherCondition.RAINY:
      return 'from-slate-500 via-blue-700 to-gray-800';
    case WeatherCondition.THUNDERSTORM:
      return 'from-gray-700 via-indigo-800 to-black';
    case WeatherCondition.SNOWY:
      return 'from-sky-200 via-slate-300 to-blue-300';
    case WeatherCondition.WINDY:
      return 'from-teal-400 via-cyan-500 to-sky-600';
    default:
      return 'from-sky-500 via-blue-600 to-indigo-700'; // Default fallback
  }
};


const App: React.FC = () => {
  const { language, setLanguage, t, tCondition } = useTranslations(
    (localStorage.getItem('preferredLanguage') as Language) || 'en'
  );
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const initialLocation = localStorage.getItem('preferredLocation') || "Cupertino";
  const [currentLocation, setCurrentLocation] = useState<string>(initialLocation);

  const [backgroundClasses, setBackgroundClasses] = useState<string>(getDynamicBackgroundClasses(null));

  const loadWeatherData = useCallback(async (location: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setBackgroundClasses(getDynamicBackgroundClasses(data));
    } catch (err) {
      setWeatherData(null);
      setBackgroundClasses(getDynamicBackgroundClasses(null)); // Reset background on error
      if (err instanceof Error) {
        if (err.message === "API_KEY_MISSING") {
          setError(t('apiKeyMissingError'));
        } else if (err.message === "CITY_NOT_FOUND") {
          setError(t('cityNotFoundError', { city: location }));
        } else {
          setError(t('fetchErrorGeneric'));
        }
      } else {
        setError(t('fetchErrorGeneric'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    loadWeatherData(currentLocation);
  }, [currentLocation, loadWeatherData]);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('preferredLocation', currentLocation);
  }, [currentLocation]);


  const locations = ["Cupertino", "London", "Tokyo", "New York", "Tehran", "Isfahan", "Shiraz", "Mashhad", "Tabriz", "Dezful"];
  
  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${backgroundClasses} flex flex-col items-center justify-center p-2 sm:p-4 transition-all duration-1000 ease-in-out`}
    >
      <div className="fixed top-4 right-4 rtl:right-auto rtl:left-4 z-10 flex items-center space-x-2 rtl:space-x-reverse">
        <select 
          value={currentLocation} 
          onChange={(e) => handleLocationChange(e.target.value)}
          className="bg-white/30 text-white p-2 rounded-md text-sm focus:ring-2 focus:ring-sky-300 outline-none backdrop-blur-sm"
          disabled={isLoading}
          aria-label={t('selectLocation')}
        >
          {locations.map(loc => <option key={loc} value={loc} className="text-gray-700">{loc}</option>)}
        </select>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as Language)}
          className="bg-white/30 text-white p-2 rounded-md text-sm focus:ring-2 focus:ring-sky-300 outline-none backdrop-blur-sm"
          disabled={isLoading}
          aria-label={t('selectLanguage')}
        >
          <option value="en" className="text-gray-700">{t('english')}</option>
          <option value="fa" className="text-gray-700">{t('persian')}</option>
        </select>
        <button
          onClick={() => loadWeatherData(currentLocation)}
          disabled={isLoading}
          className="p-2.5 rounded-full bg-white/30 hover:bg-white/40 active:bg-white/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
          aria-label={t('refresh')}
        >
          <RefreshIcon className={`w-5 h-5 text-white ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <main className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black/10 backdrop-blur-md">
        {isLoading && !weatherData && (
          <div className="flex flex-col items-center justify-center h-[500px] text-white">
            <RefreshIcon className="w-12 h-12 animate-spin text-sky-200 mb-4" />
            <p className="text-lg">{t('fetchingWeather')}</p>
          </div>
        )}
        {error && (
          <div className="p-8 text-center text-red-200 bg-red-700/50">
            <h3 className="text-xl font-semibold mb-2">{t('oopsError')}</h3>
            <p>{error}</p>
            <button 
              onClick={() => loadWeatherData(currentLocation)}
              className="mt-4 px-4 py-2 bg-sky-200 text-sky-700 rounded-md hover:bg-sky-300 transition-colors"
            >
              {t('tryAgain')}
            </button>
          </div>
        )}
        {!isLoading && weatherData && (
          <>
            <CurrentWeatherDisplay data={weatherData} t={t} tCondition={tCondition} />
            <div className="border-t border-white/20 my-0" />
            <WeatherDetails data={weatherData} t={t} />
            <div className="border-t border-white/20 my-0 mx-4" /> 
            <PollutionDisplay data={weatherData} t={t} />
          </>
        )}
         {isLoading && weatherData && ( 
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-20">
             <RefreshIcon className="w-10 h-10 animate-spin text-white" />
          </div>
        )}
      </main>
      <footer className="text-center text-xs text-sky-200/70 mt-6">
        {t('copyright', { year: new Date().getFullYear().toString() })}
      </footer>
    </div>
  );
};

export default App;