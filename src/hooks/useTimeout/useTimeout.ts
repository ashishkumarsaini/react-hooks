import { useEffect } from "react";

const DEFAULT_DELAY_FOR_TIMEOUT = 300;

interface TimeoutCallback {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): void;
}
interface UseTimeout {
    (callback: TimeoutCallback, delay?: number): void;
}

/**
 * A custom hook that sets a timeout for a callback function.
 * @param callback The function to call after the timeout.
 * @param delay The timeout delay in milliseconds.
 */
export const useTimeout: UseTimeout = (callback, delay = DEFAULT_DELAY_FOR_TIMEOUT) => {
    useEffect(() => {
        const timer = setTimeout(callback, delay);

        return () => clearTimeout(timer);
    }, [callback, delay]);
};
