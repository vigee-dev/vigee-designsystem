import { type ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
export declare const formatCurrency: (amount: number) => string;
export declare const formatDateToLocal: (dateStr: string, locale?: string) => string;
export declare const generatePagination: (currentPage: number, totalPages: number) => (string | number)[];
export declare const truncateText: (text: string, length?: number) => string;
export declare const matchStatus: (status: string) => {
    color: string;
    text: string;
};
export declare const matchRolesStatus: (status: string) => {
    color: string;
    text: string;
};
export type PaginationInfo = {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};
export declare const currency: (number: number) => {
    toEuro: () => string;
    toRoundedEuro: () => string;
};
