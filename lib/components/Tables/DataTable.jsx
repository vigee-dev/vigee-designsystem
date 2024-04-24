"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
var react_1 = __importDefault(require("react"));
var react_table_1 = require("@tanstack/react-table");
var table_1 = require("../ui/table");
function DataTable(_a) {
    var _b;
    var title = _a.title, info = _a.info, columns = _a.columns, data = _a.data, search = _a.search, lines = _a.lines, onNewClientClick = _a.onNewClientClick;
    var _c = react_1.default.useState([]), columnFilters = _c[0], setColumnFilters = _c[1];
    var _d = react_1.default.useState(undefined), globalFilter = _d[0], setGlobalFilter = _d[1];
    var _e = react_1.default.useState({}), rowSelection = _e[0], setRowSelection = _e[1];
    var table = (0, react_table_1.useReactTable)({
        data: data,
        columns: columns,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getPaginationRowModel: (0, react_table_1.getPaginationRowModel)(),
        getSortedRowModel: (0, react_table_1.getSortedRowModel)(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: (0, react_table_1.getFilteredRowModel)(),
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
    return (<div className="w-full">
      <div className="flex justify-between items-center font-medium text-sm text-gray-400 pb-4 ">
        {title && <p>{title}</p>}
        {info && <p>{info}</p>}
      </div>

      <div>
        <table_1.Table>
          <table_1.TableHeader>
            {table.getHeaderGroups().map(function (headerGroup) { return (<table_1.TableRow key={headerGroup.id}>
                {headerGroup.headers.map(function (header) {
                return (<table_1.TableHead key={header.id} className="bg-gray-50">
                      {header.isPlaceholder
                        ? null
                        : (0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext())}
                    </table_1.TableHead>);
            })}
              </table_1.TableRow>); })}
          </table_1.TableHeader>
          <table_1.TableBody>
            {((_b = table.getRowModel().rows) === null || _b === void 0 ? void 0 : _b.length) ? (table.getRowModel().rows.map(function (row) { return (<table_1.TableRow key={row.id} data-state={row.getIsSelected() && "selected"} onClick={function () { return onNewClientClick && onNewClientClick(row.id); }}>
                  {row.getVisibleCells().map(function (cell) { return (<table_1.TableCell key={cell.id}>
                      {(0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext())}
                    </table_1.TableCell>); })}
                </table_1.TableRow>); })) : (<table_1.TableRow>
                <table_1.TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat
                </table_1.TableCell>
              </table_1.TableRow>)}
          </table_1.TableBody>
        </table_1.Table>

        {table.getFilteredSelectedRowModel().rows.length > 0 && (<div className="flex-1 text-sm text-muted-foreground mt-2">
            {table.getFilteredSelectedRowModel().rows.length.toLocaleString()}{" "}
            sur {table.getFilteredRowModel().rows.length.toLocaleString()}{" "}
            lignes(s) sélectionnée(s)
          </div>)}
      </div>
    </div>);
}
exports.DataTable = DataTable;
