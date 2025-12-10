import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value); // State to hold the debounced value

  useEffect(() => {
    // Set up a timer
    const handler = setTimeout(() => {
      setDebouncedValue(value); // Update debounced value after the delay
    }, delay);

    return () => {
      clearTimeout(handler); // Clean up the timer if value changes or component unmounts
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}