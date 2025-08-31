import { useState } from "react"

/**
 * A custom hook that manages a counter state.
 * @param initialCountValue - The initial count value (default: 0).
 * @returns An object containing the current count and a function to change it.
 */
export const useCounter = (initialCountValue = 0) => {
    const [count, setCount] = useState(initialCountValue);

    const handleChangeCount = ({ countChange = 1, isIncremental = true }: { countChange?: number, isIncremental?: boolean }) => {
        if (isIncremental) {
            setCount((prev) => prev + countChange);
        } else {
            setCount((prev) => prev - countChange);
        }
    };

    return [count, handleChangeCount];
}