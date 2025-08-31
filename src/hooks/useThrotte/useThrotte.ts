import { useRef } from "react";

const DEFAULT_TIMEOUT_FOR_THROTTLE = 300;

interface ThrottledCallback {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): void;
}
interface UseThrottle {
    (callback: ThrottledCallback, delay?: number): ThrottledCallback;
}

/**
 * A custom hook that throttles a callback function.
 * @param callback The function to throttle.
 * @param delay The throttle delay in milliseconds.
 * @returns A throttled version of the callback function.
 */
export const useThrottle: UseThrottle = (callback, delay = DEFAULT_TIMEOUT_FOR_THROTTLE) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const throttledCallback: ThrottledCallback = (args) => {
        if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
                callback(args);
                timerRef.current = null;
            }, delay);
        }
    };

    return throttledCallback;
};