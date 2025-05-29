
import React from 'react';

interface IconProps {
  className?: string;
}

export const ThermometerIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    {/* Simplified thermometer path */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V15m0 0A2.25 2.25 0 009.75 17.25h4.5A2.25 2.25 0 0012 15zm0 0V6.75" />
    {/* Optional: Add the bulb part more explicitly if desired, for now keeping it simple as per the "simplified" comment */}
    {/* <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />  Example bulb */}
  </svg>
);

export const DropletIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 5.625-7.5 11.25-7.5 11.25S4.5 16.125 4.5 10.5a7.5 7.5 0 1115 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" /> {/* Inner drop */}
  </svg>
);

export const WindIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.125 1.125 0 010 2.25H5.625a1.125 1.125 0 010-2.25zm0 3.75h12.75a1.125 1.125 0 010 2.25H5.625a1.125 1.125 0 010-2.25z" />
  </svg>
);

export const PrecipitationIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 0h10.5M5.25 16.5A2.25 2.25 0 013 14.25V9.75A2.25 2.25 0 015.25 7.5h13.5A2.25 2.25 0 0121 9.75v4.5A2.25 2.25 0 0118.75 16.5M12 12.75V19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l1.5 1.5 1.5-1.5M9 9.75l1.5 1.5 1.5-1.5M12 6.75v3" />
  </svg>
);
