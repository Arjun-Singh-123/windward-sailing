import { useState, useEffect } from "react";

const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // Check if window is defined
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue; // Parse the item if it exists
    } catch (error) {
      console.error(error); // Log any error
      return initialValue; // Return initial value on error
    }
  });

  useEffect(() => {
    if (storedValue !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(storedValue)); // Save to localStorage
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue]; // Return stored value and setter function
};

export default useLocalStorage;
