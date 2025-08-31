import { useEffect, useRef } from "react";

const DEFAULT_TIMEOUT_FOR_DEBOUNCE = 300;

interface DebouncedCallback {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): void;
}
interface UseDebounce {
    (callback: DebouncedCallback, delay?: number): DebouncedCallback;
}

/**
 * A custom hook that debounces a callback function.
 * @param callback The function to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns A debounced version of the callback function.
 */
export const useDebounce: UseDebounce = (callback, delay = DEFAULT_TIMEOUT_FOR_DEBOUNCE) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const debouncedCallback: DebouncedCallback = (args) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            callback(args);
        }, delay);
    };

    return debouncedCallback;
};