import { useEffect, useRef } from "react";

/**
 * A custom hook that returns the previous value of a state or prop.
 * The previous value is returned first and then the previousValueRef will update after the value is returned.
 * @param updatedValue - The current value.
 * @returns The previous value.
 */
export const usePrevious = <T>(updatedValue: T): T | null => {
    const previousValueRef = useRef<T | null>(null);

    useEffect(() => {
        previousValueRef.current = updatedValue;
    }, [updatedValue]);

    return previousValueRef.current;
};
