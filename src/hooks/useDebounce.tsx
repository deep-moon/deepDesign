import { useEffect, useState } from "react";
function useDebounce(value: any, delay = 300) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);
  return debounceValue;
}
export default useDebounce;
