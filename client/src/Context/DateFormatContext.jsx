import React, { createContext, useContext, useEffect, useState } from 'react';

export const DATE_FORMAT_OPTIONS = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (12/05/2026)' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (05/12/2026)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2026-05-12)' },
];

const DateFormatContext = createContext(null);

export function DateFormatProvider({ children }) {
  const [dateFormat, setDateFormat] = useState(() => {
    return localStorage.getItem('trafficSense_date_format') || 'DD/MM/YYYY';
  });

  useEffect(() => {
    localStorage.setItem('trafficSense_date_format', dateFormat);
  }, [dateFormat]);

  return (
    <DateFormatContext.Provider value={{ dateFormat, setDateFormat }}>
      {children}
    </DateFormatContext.Provider>
  );
}

export function useDateFormat() {
  const ctx = useContext(DateFormatContext);
  if (!ctx) throw new Error('useDateFormat must be used inside <DateFormatProvider>');
  return ctx;
}