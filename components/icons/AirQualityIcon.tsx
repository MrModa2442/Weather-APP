import React from 'react';

interface IconProps {
  className?: string;
}

export const AirQualityIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className || "w-5 h-5"}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75s-2.68.94-4.58 2.84S3 12.75 3 12.75m0 0s1.28 2.25 4.58 3.41S12 18.75 12 18.75m0 0s2.68-.94 4.58-2.84S21 12.75 21 12.75m0 0s-1.28-2.25-4.58-3.41S12 6.75 12 6.75m0 0A7.5 7.5 0 1012 18.75A7.5 7.5 0 0012 6.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);