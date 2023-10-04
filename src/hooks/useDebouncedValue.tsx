import { useEffect, useState } from "react";

export const useDebouncedValue = ( input: string, time: number = 500 ) => {
  
  const [debouncedValue, setDebouncedValue] = useState(input);

  // Create an effect to listen when the input value changes & dispatch some action inside of him
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    // useEffect cleanup
    return () => {
      clearTimeout(timeout);
    }
  }, [input])
  

  return debouncedValue;
};
