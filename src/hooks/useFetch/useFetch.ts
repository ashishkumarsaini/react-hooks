import { useEffect, useState } from "react";

interface HandleFetch {
    (): void;
}
interface UseFetchResults<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    onFetch: HandleFetch;
}
interface UseFetch {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   (url: string, fetchOptions: RequestInit, shouldFetchOnMount: boolean): UseFetchResults<any>;
}

/**
 * Custom React hook for fetching data from a given URL.
 * @param {string} url - The endpoint to fetch data from.
 * @param {RequestInit} [fetchOptions] - Optional fetch configuration options.
 * @param {boolean} [shouldFetchOnMount] - If true, fetch is triggered on mount.
 * @returns {UseFetchResults<any>} - An object containing the fetched data, loading state, error message,
 * and a function to manually trigger fetch.
 */
export const useFetch: UseFetch = (url, fetchOptions, shouldFetchOnMount) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);


    const handleFetch: HandleFetch = () => {
        if (!url) {
            return null;
        }

        const controller = new AbortController();

        setIsLoading(true);
        setError('');
        setData(null);

        fetch(url, {
            ...fetchOptions,
            signal: controller.signal,
        }).then(async (response) => {
            const data = await response.json();
            setData(data);
        }).catch(() => {
            setError("Failed to fetch data"); // Custom error message
        }).finally(() => {
            setIsLoading(false);
            controller.abort();
        });
    };

    useEffect(() => {
        if (shouldFetchOnMount) {
            handleFetch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, shouldFetchOnMount]);

    return {
        data,
        loading: isLoading,
        error,
        onFetch: handleFetch
    };
}