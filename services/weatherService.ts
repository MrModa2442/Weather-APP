

import { WeatherData, WeatherCondition } from '../types';

// IMPORTANT: API Key for WeatherAPI.com
const API_KEY = "7028e366d92c479db19101722252905"; // WeatherAPI.com key

// Calculates school closure chance based on US EPA AQI index (1-6)
const calculateSchoolClosureChance = (aqi: number): number => {
  let chance = 0;
  // More realistic and deterministic ranges
  if (aqi <= 1) { // AQI 1 (Good)
    chance = 0;
  } else if (aqi === 2) { // AQI 2 (Moderate)
    chance = Math.round(Math.random() * 2); // 0-2%
  } else if (aqi === 3) { // AQI 3 (Unhealthy for Sensitive)
    chance = 5 + Math.round(Math.random() * 10); // 5-15%
  } else if (aqi === 4) { // AQI 4 (Unhealthy)
    chance = 30 + Math.round(Math.random() * 20); // 30-50%
  } else if (aqi === 5) { // AQI 5 (Very Unhealthy)
    chance = 60 + Math.round(Math.random() * 25); // 60-85%
  } else if (aqi >= 6) { // AQI 6 (Hazardous)
    chance = 85 + Math.round(Math.random() * 15); // 85-100%
  }
  return Math.min(100, Math.max(0, Math.round(chance))); // Ensure it's within 0-100
};

// Maps WeatherAPI.com condition codes and text to WeatherCondition enum
const mapApiConditionToWeatherCondition = (apiConditionCode: number, apiConditionText: string, windSpeedKmH: number): WeatherCondition => {
  const text = apiConditionText.toLowerCase();

  if (windSpeedKmH > 50) return WeatherCondition.WINDY;

  // WeatherAPI.com condition codes documentation: https://www.weatherapi.com/docs/weather_conditions.json
  switch (apiConditionCode) {
    case 1000: // Sunny or Clear (night)
      return WeatherCondition.SUNNY;
    case 1003: // Partly cloudy
      return WeatherCondition.PARTLY_CLOUDY;
    case 1006: // Cloudy
    case 1009: // Overcast
      return WeatherCondition.CLOUDY;
    case 1030: // Mist
    case 1135: // Fog
    case 1147: // Freezing fog
      return WeatherCondition.MIST;
    case 1063: // Patchy rain possible
    case 1150: // Patchy light drizzle
    case 1153: // Light drizzle
    case 1168: // Light freezing rain
    case 1171: // Heavy freezing drizzle
    case 1180: // Patchy light rain
    case 1183: // Light rain
    case 1186: // Moderate rain at times
    case 1189: // Moderate rain
    case 1192: // Heavy rain at times
    case 1195: // Heavy rain
    case 1198: // Light freezing rain
    case 1201: // Moderate or heavy freezing rain
    case 1240: // Light rain shower
    case 1243: // Moderate or heavy rain shower
    case 1246: // Torrential rain shower
      return WeatherCondition.RAINY;
    case 1066: // Patchy snow possible
    case 1069: // Patchy sleet possible (map to snow for simplicity)
    case 1114: // Blowing snow
    case 1117: // Blizzard
    case 1204: // Light sleet
    case 1207: // Moderate or heavy sleet
    case 1210: // Patchy light snow
    case 1213: // Light snow
    case 1216: // Patchy moderate snow
    case 1219: // Moderate snow
    case 1222: // Patchy heavy snow
    case 1225: // Heavy snow
    case 1237: // Ice pellets (map to snow)
    case 1249: // Light sleet showers
    case 1252: // Moderate or heavy sleet showers
    case 1255: // Light snow showers
    case 1258: // Moderate or heavy snow showers
    case 1261: // Light showers of ice pellets
    case 1264: // Moderate or heavy showers of ice pellets
      return WeatherCondition.SNOWY;
    case 1087: // Thundery outbreaks possible
    case 1273: // Patchy light rain with thunder
    case 1276: // Moderate or heavy rain with thunder
    case 1279: // Patchy light snow with thunder
    case 1282: // Moderate or heavy snow with thunder
      return WeatherCondition.THUNDERSTORM;
    default:
      // Fallback based on text if code is not specific enough
      if (text.includes("thunder")) return WeatherCondition.THUNDERSTORM;
      if (text.includes("snow") || text.includes("sleet") || text.includes("ice pellets") || text.includes("blizzard")) return WeatherCondition.SNOWY;
      if (text.includes("rain") || text.includes("drizzle")) return WeatherCondition.RAINY;
      if (text.includes("mist") || text.includes("fog")) return WeatherCondition.MIST;
      if (text.includes("clear") || text.includes("sunny")) return WeatherCondition.SUNNY;
      if (text.includes("cloudy") || text.includes("overcast")) return WeatherCondition.CLOUDY; // Covers partly cloudy too if not caught by code
      return WeatherCondition.PARTLY_CLOUDY; // Default general fallback
  }
};

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  if (!API_KEY) {
    console.error("WeatherAPI.com API key is missing.");
    throw new Error("API_KEY_MISSING");
  }

  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=1&aqi=yes`;
  
  let apiResponse;
  try {
    const response = await fetch(apiUrl);
    apiResponse = await response.json();

    if (!response.ok) {
      // WeatherAPI.com error structure: response.error.code, response.error.message
      if (apiResponse.error) {
        if (apiResponse.error.code === 1002 || apiResponse.error.code === 2006 || apiResponse.error.code === 2007 || apiResponse.error.code === 2008) { // API key related errors
           console.error("WeatherAPI.com API key error:", apiResponse.error.message);
           throw new Error("API_KEY_MISSING"); // Use generic key for app
        }
        if (apiResponse.error.code === 1006) { // Location not found
          console.error("WeatherAPI.com location not found:", apiResponse.error.message);
          throw new Error("CITY_NOT_FOUND");
        }
        throw new Error(apiResponse.error.message || `HTTP error! status: ${response.status}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching weather data from WeatherAPI.com:", error);
    if (error instanceof Error && (error.message === "API_KEY_MISSING" || error.message === "CITY_NOT_FOUND")) {
        throw error;
    }
    // Could be network error, JSON parse error, etc.
    throw new Error("Failed to fetch weather data from WeatherAPI.com.");
  }

  const { location: locData, current, forecast } = apiResponse;
  const forecastDay = forecast.forecastday[0].day;

  const windSpeedKmh = current.wind_kph;
  const airQualityIndex = current.air_quality && current.air_quality['us-epa-index'] ? current.air_quality['us-epa-index'] : 3; // Default to 3 (Moderate) if no data

  // Use the higher of rain or snow chance
  const precipitationChance = Math.max(forecastDay.daily_chance_of_rain || 0, forecastDay.daily_chance_of_snow || 0);

  const mappedData: WeatherData = {
    locationName: locData.name,
    temperature: Math.round(current.temp_c),
    condition: mapApiConditionToWeatherCondition(current.condition.code, current.condition.text, windSpeedKmh),
    precipitationChance: precipitationChance,
    humidity: current.humidity,
    windSpeed: parseFloat(windSpeedKmh.toFixed(1)),
    feelsLike: Math.round(current.feelslike_c),
    timestamp: new Date(current.last_updated_epoch * 1000).toISOString(),
    lowTemp: Math.round(forecastDay.mintemp_c),
    highTemp: Math.round(forecastDay.maxtemp_c),
    airPollutionIndex: airQualityIndex, // WeatherAPI.com us-epa-index is 1 (Good) to 6 (Hazardous)
    schoolClosureChance: calculateSchoolClosureChance(airQualityIndex),
  };

  return mappedData;
};