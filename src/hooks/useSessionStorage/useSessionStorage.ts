type SetStoredValue<T> = (value: T) => void;
type GetStoredValue<T> = () => T | undefined;
type UseSessionStorage = <T>(key: string) => (T | SetStoredValue<T> | undefined)[];

/**
 * Custom hook to manage session storage state.
 * @param key - The key name for the session storage item.
 * @returns A array containing the stored value and a function to update it.
 */
export const useSessionStorage: UseSessionStorage = <T>(key: string) => {
    const isWindowAvailable: boolean = typeof window !== 'undefined';

    const setStoredValue: SetStoredValue<T> = (value: T) => {
        if (isWindowAvailable) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
    };

    const getStoredValue: GetStoredValue<T> = () => {
        if (isWindowAvailable) {
            const item: string | null = window.sessionStorage.getItem(key);

            if (item) {
                return JSON.parse(item) as T;
            }
        }

        return undefined;
    };

    const storedValue = getStoredValue();

    return [storedValue, setStoredValue];
};