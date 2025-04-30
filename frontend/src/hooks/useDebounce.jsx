import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeOut);
    }, [value, delay]);

    return debouncedValue;
}
