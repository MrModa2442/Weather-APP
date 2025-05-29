import React from 'react';
import { WeatherCondition } from '../types';

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className }) => {
  const iconSize = className || "w-24 h-24"; // Default size

  switch (condition) {
    case WeatherCondition.SUNNY:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${iconSize} text-yellow-400`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.364l-1.591 1.591M21 12h-2.25m-.364 6.364l-1.591-1.591M12 18.75V21m-6.364-.364l1.591-1.591M3 12h2.25m.364-6.364l1.591 1.591" />
        </svg>
      );
    case WeatherCondition.PARTLY_CLOUDY:
      return ( // Sun behind cloud icon
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${iconSize} text-gray-500`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a.75.75 0 01.75.75v.549a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zm4.579 2.171a.75.75 0 011.06 0l.388.388a.75.75 0 01-1.06 1.06l-.388-.388a.75.75 0 010-1.06zM21 12a.75.75 0 01-.75.75h-.549a.75.75 0 010-1.5H20.25a.75.75 0 01.75.75zM16.75 16.252a.75.75 0 011.06 0l.388.388a.75.75 0 01-1.06 1.06l-.388-.388a.75.75 0 010-1.06zM12 17.25a.75.75 0 01-.75.75v.549a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75zm-4.579-2.171a.75.75 0 01-1.06 0l-.388-.388a.75.75 0 111.06-1.06l.388.388a.75.75 0 010 1.06zM6.75 12a.75.75 0 01.75-.75h.549a.75.75 0 010 1.5H7.5a.75.75 0 01-.75-.75zm2.071-6.721a.75.75 0 01-1.06 0L7.373 4.89a.75.75 0 011.06-1.061l.388.388a.75.75 0 010 1.06z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 20.25C12.058 20.25 11.383 20.077 10.79 19.755C10.214 19.444 9.728 19.012 9.379 18.497C8.73 17.545 8.636 16.348 9.163 15.312C9.69 14.276 10.77 13.5 12 13.5C12.912 13.5 13.735 13.852 14.355 14.472C14.975 15.092 15.327 15.915 15.327 16.827C15.327 17.923 14.966 18.931 14.25 19.575C13.763 20.006 13.275 20.25 12.75 20.25zM18.682 17.925A4.254 4.254 0 0018.75 16.5C18.75 14.151 16.849 12.25 14.5 12.25C14.007 12.25 13.534 12.343 13.098 12.512" />
        </svg>
      );
    case WeatherCondition.CLOUDY:
    case WeatherCondition.MIST:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${iconSize} text-gray-400`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5h10.5a4.5 4.5 0 004.5-4.5c0-2.176-1.223-4.043-3-4.922V9.75a3 3 0 00-3-3h-4.5a3 3 0 00-3 3v.328c-1.777.88-3 2.746-3 4.922z" />
        </svg>
      );
    case WeatherCondition.RAINY:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${iconSize} text-blue-500`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5h10.5a4.5 4.5 0 004.5-4.5c0-2.176-1.223-4.043-3-4.922V9.75a3 3 0 00-3-3h-4.5a3 3 0 00-3 3v.328c-1.777.88-3 2.746-3 4.922z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 18.75H10.5M13.5 18.75H14.25M9 21H9.75M14.25 21H15M11.25 20.25v.75M12.75 20.25v.75" /> {/* Rain drops */}
        </svg>
      );
    case WeatherCondition.SNOWY:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${iconSize} text-sky-300`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0V4.5m0 15l-3.75-3.75M12 19.5l3.75-3.75M12 4.5l3.75 3.75M12 4.5L8.25 8.25m-4.125 4.125h15.75M3.375 12h17.25" /> {/* Snowflake */}
        </svg>
      );
    case WeatherCondition.THUNDERSTORM:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${iconSize} text-yellow-500`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5h10.5a4.5 4.5 0 004.5-4.5c0-2.176-1.223-4.043-3-4.922V9.75a3 3 0 00-3-3h-4.5a3 3 0 00-3 3v.328c-1.777.88-3 2.746-3 4.922z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l-2.25 4.5h4.5l-2.25-4.5zm-2.625-2.25L9 15h6l-1.125-2.25L12 10.5l-1.875 2.25z" /> {/* Lightning bolt */}
        </svg>
      );
    case WeatherCondition.WINDY: // Added WINDY icon
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${iconSize} text-sky-400`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h12.5M3.75 19.5h8.5" /> 
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.5A2.25 2.25 0 0014.25 2.25h-4.5A2.25 2.25 0 007.5 4.5v4.5A2.25 2.25 0 009.75 11.25h0A2.25 2.25 0 0012 9V4.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4.5A1.5 1.5 0 004.5 2.25H3A1.5 1.5 0 001.5 3.75v1.5A1.5 1.5 0 003 6.75h0A1.5 1.5 0 004.5 5.25V4.5" />
        </svg>
      );
    default: // Fallback icon
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${iconSize} text-gray-400`}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75c1.446 0 2.828.494 3.922 1.384a5.25 5.25 0 010 7.464M12 9.75A5.23 5.23 0 006.38 12c0 .67.134 1.308.383 1.898M12 9.75A8.962 8.962 0 004.082 12c0 3.242 2.09 6.012 5.002 7.43L12 21.75l2.918-2.32c2.911-1.418 5.002-4.188 5.002-7.43a8.962 8.962 0 00-7.918-2.25zM12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" /> {/* Question mark like / map pin */}
        </svg>
      );
  }
};