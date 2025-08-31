import { useState } from "react";

/**
 * A custom hook that manages a boolean toggle state.
 * @param initialValue - The initial state value (default: false).
 * @returns An array containing the current state and a function to toggle it.
 */
export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState<boolean>(initialValue);

    const onToggle = () => setValue((prev) => !prev);

    return [value, onToggle];
};
