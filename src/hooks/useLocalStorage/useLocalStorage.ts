type SetStoredValue<T> = (value: T) => void;
type GetStoredValue<T> = () => T | undefined;
type UseLocalStorage = <T>(key: string) => (T | SetStoredValue<T> | undefined)[];

/**
 * Custom hook to manage local storage state.
 * @param key - The key name for the local storage item.
 * @returns A array containing the stored value and a function to update it.
 */
export const useLocalStorage: UseLocalStorage = <T>(key: string) => {
    const isWindowAvailable: boolean = typeof window !== 'undefined';

    const setStoredValue: SetStoredValue<T> = (value: T) => {
        if (isWindowAvailable) {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    };

    const getStoredValue: GetStoredValue<T> = () => {
        if (isWindowAvailable) {
            const item: string | null = window.localStorage.getItem(key);

            if (item) {
                return JSON.parse(item) as T;
            }
        }

        return undefined;
    };

    const storedValue = getStoredValue();

    return [storedValue, setStoredValue];
};