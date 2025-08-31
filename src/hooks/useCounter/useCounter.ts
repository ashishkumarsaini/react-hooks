import { useState } from "react"

type handleChangeCount = (options: { countChange?: number, isIncremental?: boolean }) => void;
interface UseCounter<T> {
    (initialCountValue: T): [T | null, handleChangeCount];
}

/**
 * A custom hook that manages a counter state.
 * @param initialCountValue - The initial count value (default: 0).
 * @returns An object containing the current count and a function to change it.
 */
export const useCounter: UseCounter<number> = (initialCountValue = 0) => {
    const [count, setCount] = useState(initialCountValue);

    const handleChangeCount: handleChangeCount = ({ countChange = 1, isIncremental = true }) => {
        if (isIncremental) {
            setCount((prev) => prev + countChange);
        } else {
            setCount((prev) => prev - countChange);
        }
    };

    return [count, handleChangeCount];
}