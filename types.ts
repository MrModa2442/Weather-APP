export enum WeatherCondition {
  SUNNY = "Sunny",
  CLOUDY = "Cloudy",
  RAINY = "Rain",
  SNOWY = "Snow",
  THUNDERSTORM = "Thunderstorm",
  PARTLY_CLOUDY = "Partly Cloudy",
  MIST = "Mist",
  WINDY = "Windy", // Added WINDY condition
}

export interface WeatherData {
  locationName: string;
  temperature: number; // Celsius
  condition: WeatherCondition;
  precipitationChance: number; // Percentage
  humidity: number; // Percentage
  windSpeed: number; // km/h
  feelsLike: number; // Celsius
  timestamp: string; // ISO string
  lowTemp: number; // Celsius
  highTemp: number; // Celsius
  airPollutionIndex: number; // e.g., AQI value
  schoolClosureChance: number; // Percentage (0-100)
}