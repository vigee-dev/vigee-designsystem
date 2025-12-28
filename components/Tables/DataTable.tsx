"use client";
import React, { ReactNode, useRef, useEffect } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
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

import { Table as TanstackTable } from "@tanstack/react-table";
import { cn } from "../lib/utils";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    cellClassName?: string;
    tableHeaderCell?: string;
  }
}

interface ClassNames {
  root?: string;
  header?: string;
  headerTitle?: string;
  headerInfo?: string;
  table?: string;
  tableWrapper?: string;
  tableHeader?: string;
  tableHeaderRow?: string;
  tableHeaderCell?: string;
  tableBody?: string;
  tableRow?: string;
  tableCell?: string;
  noResultsRow?: string;
  noResultsCell?: string;
  skeletonRow?: string;
  skeletonCell?: string;
  footer?: string;
}

interface DataTableProps<TData, TValue> {
  title?: string;
  info?: string;
  search?: boolean;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: Row<TData>) => void;
  lines?: number;
  className?: string;
  tableHook?: TanstackTable<TData>;
  displayBottomRowsSkeleton?: boolean;
  rowClassname?: string;
  classNames?: ClassNames;
  onReachBottom?: () => void;
}

export function DataTable<TData, TValue>({
  title,
  info,
  columns,
  data,
  search,
  lines,
  onRowClick,
  className,
  tableHook,
  displayBottomRowsSkeleton = false,
  rowClassname,
  classNames = {},
  onReachBottom,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState<string | undefined>(
    undefined
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onReachBottom) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onReachBottom();
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [onReachBottom]);

  const table = useReactTable(
    tableHook?.options || {
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
        globalFilter,
        rowSelection,
        pagination: {
          pageIndex: 0,
          pageSize: lines || 10,
        },
      },
    }
  );

  const RowSkeleton = () => {
    return (
      <TableRow className={classNames.skeletonRow}>
        {table.getVisibleLeafColumns().map((column, index) => (
          <TableCell
            key={index}
            className={cn("py-6", classNames.skeletonCell)}
          >
            <div className="h-6 animate-pulse w-full rounded bg-gray-100"></div>
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <div className={cn("w-full", className, classNames.root)}>
      <div
        className={cn(
          "flex justify-between items-center font-medium text-sm text-slate-400",
          classNames.header
        )}
      >
        {title && <p className={classNames.headerTitle}>{title}</p>}
        {info && <p className={classNames.headerInfo}>{info}</p>}
      </div>

      <div>
        <Table
          wrapperClassName={classNames.tableWrapper}
          className={classNames.table}
        >
          <TableHeader className={classNames.tableHeader}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={classNames.tableHeaderRow}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "bg-gray-50",
                        classNames.tableHeaderCell,
                        header.column.columnDef.meta?.tableHeaderCell
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : (flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          ) as ReactNode)}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={classNames.tableBody}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={cn(
                    onRowClick && "cursor-pointer",
                    rowClassname,
                    classNames.tableRow
                  )}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell.column.columnDef.meta?.cellClassName,
                        classNames.tableCell
                      )}
                    >
                      {
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        ) as ReactNode
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={classNames.noResultsRow}>
                <TableCell
                  colSpan={columns.length}
                  className={cn("h-24 text-center", classNames.noResultsCell)}
                >
                  Aucun résultat
                </TableCell>
              </TableRow>
            )}

            {displayBottomRowsSkeleton && (
              <>
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
              </>
            )}
            <div ref={bottomRef} style={{ height: "10px" }} />
          </TableBody>
        </Table>

        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div
            className={cn(
              "flex-1 text-sm text-muted-foreground mt-2",
              classNames.footer
            )}
          >
            {table.getFilteredSelectedRowModel().rows.length.toLocaleString()}{" "}
            sur {table.getFilteredRowModel().rows.length.toLocaleString()}{" "}
            lignes(s) sélectionnée(s)
          </div>
        )}
      </div>
    </div>
  );
}
