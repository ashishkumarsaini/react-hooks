import { useEffect } from "react";

const DEFAULT_DELAY_FOR_TIMEOUT = 300;

interface IntervalCallback {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): void;
}
interface UseInterval {
    (callback: IntervalCallback, delay?: number): void;
}

/**
 * A custom hook that sets up an interval for a callback function.
 * @param callback The function to call on each interval.
 * @param delay The interval delay in milliseconds.
 */
export const useInterval: UseInterval = (callback, delay = DEFAULT_DELAY_FOR_TIMEOUT) => {
    useEffect(() => {
        const interval = setInterval(callback, delay);

        return () => clearInterval(interval);
    }, [callback, delay]);
};
