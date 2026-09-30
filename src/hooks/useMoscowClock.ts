'use client';

import { useState, useEffect } from 'react';

// Singleton Intl formatter to avoid garbage collection churn every second
const moscowTimeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Europe/Moscow',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export function useMoscowClock(initialValue = '--:--:--') {
  const [clock, setClock] = useState(initialValue);

  useEffect(() => {
    const updateTime = () => setClock(moscowTimeFormatter.format(new Date()));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return clock;
}
