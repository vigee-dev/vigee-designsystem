"use client";
import React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DataTableProps<TData, TValue> {
  title?: string;
  info?: string;
  search?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onNewClientClick?: (id: string) => void;
}

export function DataTable<TData, TValue>({
  title,
  info,
  columns,
  data,
  search,
  onNewClientClick,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState<string | undefined>(
    undefined
  );
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      globalFilter, // Utilisez l'état globalFilter pour la recherche globale
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center font-medium text-sm text-gray-400 pb-4 ">
        {title && <p>{title}</p>}
        {info && <p>{info}</p>}
      </div>

      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="bg-primary-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onNewClientClick && onNewClientClick(row.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="flex-1 text-sm text-muted-foreground mt-2">
            {table.getFilteredSelectedRowModel().rows.length.toLocaleString()}{" "}
            sur {table.getFilteredRowModel().rows.length.toLocaleString()}{" "}
            lignes(s) sélectionnée(s)
          </div>
        )}
      </div>
    </div>
  );
}
