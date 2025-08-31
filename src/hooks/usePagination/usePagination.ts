import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = any;

interface UsePagination {
    (items: Item[], itemsPerPage: number): void
}

const generatePagesWithItems = (items: Item[], itemsPerPage: number) => {
    const pagesWithItems: Item[] = [];

    for (let i = 0; i < items.length; i += itemsPerPage) {
        pagesWithItems.push(items.slice(i, i + itemsPerPage));
    }

    return pagesWithItems;
}

/**
 * Custom hook for paginating items.
 * @param items Array of items to paginate.
 * @param itemsPerPage Number of items per page.
 * @returns An object containing total pages count, callback to change page index, current page index and items.
 */
export const usePagination: UsePagination = (items, itemsPerPage) => {
    const pagesWithItems = generatePagesWithItems(items, itemsPerPage);
    const pagesCount = pagesWithItems.length;

    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [currentPageItems, setCurrentPageItems] = useState([]);

    useEffect(() => {
        setCurrentPageItems(pagesWithItems[currentPageIndex-1]);
    }, [currentPageIndex, pagesWithItems]);

    return { currentPageIndex, pagesCount, currentPageItems, setCurrentPageIndex };
}