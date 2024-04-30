"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
export function DataTable(_a) {
    var _b;
    var title = _a.title, info = _a.info, columns = _a.columns, data = _a.data, search = _a.search, lines = _a.lines, onNewClientClick = _a.onNewClientClick;
    var _c = React.useState([]), columnFilters = _c[0], setColumnFilters = _c[1];
    var _d = React.useState(undefined), globalFilter = _d[0], setGlobalFilter = _d[1];
    var _e = React.useState({}), rowSelection = _e[0], setRowSelection = _e[1];
    var table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters: columnFilters,
            globalFilter: globalFilter, // Utilisez l'état globalFilter pour la recherche globale
            rowSelection: rowSelection,
            pagination: {
                pageIndex: 0,
                pageSize: lines || 10,
            },
        },
    });
    return (_jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex justify-between items-center font-medium text-sm text-gray-400 pb-4 ", children: [title && _jsx("p", { children: title }), info && _jsx("p", { children: info })] }), _jsxs("div", { children: [_jsxs(Table, { children: [_jsx(TableHeader, { children: table.getHeaderGroups().map(function (headerGroup) { return (_jsx(TableRow, { children: headerGroup.headers.map(function (header) {
                                        return (_jsx(TableHead, { className: "bg-gray-50", children: header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext()) }, header.id));
                                    }) }, headerGroup.id)); }) }), _jsx(TableBody, { children: ((_b = table.getRowModel().rows) === null || _b === void 0 ? void 0 : _b.length) ? (table.getRowModel().rows.map(function (row) { return (_jsx(TableRow, { "data-state": row.getIsSelected() && "selected", onClick: function () { return onNewClientClick && onNewClientClick(row.id); }, children: row.getVisibleCells().map(function (cell) { return (_jsx(TableCell, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)); }) }, row.id)); })) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: "h-24 text-center", children: "Aucun r\u00E9sultat" }) })) })] }), table.getFilteredSelectedRowModel().rows.length > 0 && (_jsxs("div", { className: "flex-1 text-sm text-muted-foreground mt-2", children: [table.getFilteredSelectedRowModel().rows.length.toLocaleString(), " ", "sur ", table.getFilteredRowModel().rows.length.toLocaleString(), " ", "lignes(s) s\u00E9lectionn\u00E9e(s)"] }))] })] }));
}
