import { useState } from "react";

interface CopyToClipboard {
    (text: string): void;
}

interface UseClipboard {
    copiedText: string | null;
    copyToClipboard: CopyToClipboard;
}

/**
 * Custom hook to manage clipboard operations.
 * @returns An object containing the copied text and a function to copy text to the clipboard.
 */
export const useClipboard = (): UseClipboard => {
    const [copiedText, setCopiedText] = useState<string | null>(null);

    const copyToClipboard: CopyToClipboard = (text) => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                setCopiedText(text);
            });
        }
    };

    return { copiedText, copyToClipboard };
};