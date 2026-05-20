import React, { createContext, useContext, useState } from 'react';

const TimezoneContext = createContext();

// Mapping zona waktu ke offset UTC dalam menit
export const TIMEZONE_OPTIONS = [
  {
    value: 'WIB',
    label: 'WIB (Asia/Jakarta) UTC+7',
    iana: 'Asia/Jakarta',
    offsetHours: 7,
  },
  {
    value: 'WITA',
    label: 'WITA (Asia/Makassar) UTC+8',
    iana: 'Asia/Makassar',
    offsetHours: 8,
  },
  {
    value: 'WIT',
    label: 'WIT (Asia/Jayapura) UTC+9',
    iana: 'Asia/Jayapura',
    offsetHours: 9,
  },
];

export function TimezoneProvider({ children }) {
  const [timezone, setTimezone] = useState('WIB');

  const currentTZ = TIMEZONE_OPTIONS.find((tz) => tz.value === timezone) || TIMEZONE_OPTIONS[0];

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone, currentTZ, TIMEZONE_OPTIONS }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const ctx = useContext(TimezoneContext);
  if (!ctx) throw new Error('useTimezone must be used within TimezoneProvider');
  return ctx;
}