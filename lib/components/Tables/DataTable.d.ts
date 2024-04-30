import { ColumnDef } from "@tanstack/react-table";
interface DataTableProps<TData, TValue> {
    title?: string;
    info?: string;
    search?: boolean;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onNewClientClick?: (id: string) => void;
    lines?: number;
}
export declare function DataTable<TData, TValue>({ title, info, columns, data, search, lines, onNewClientClick, }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
