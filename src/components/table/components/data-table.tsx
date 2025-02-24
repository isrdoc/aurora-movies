import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PaginationState, Table as TableType } from "@tanstack/table-core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { useIsMobile } from "@/lib/use-mobile";
import { IdCard, Table2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type DataView = "table" | "card";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  toolbar: (table: TableType<TData>) => React.ReactNode;
  card?: (data: TData, id: string) => React.ReactNode;
  isCardView?: boolean;
  views?: DataView[];
};

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbar,
  card,
  isCardView: initialIsCardView = false,
  views = ["table", "card"],
}: DataTableProps<TData, TValue>) {
  // TODO: move to each page specifically, use zustand with local storage to save display preferences for each table
  const [isCardView, setIsCardView] =
    React.useState<boolean>(initialIsCardView);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      desc: true,
      id: "created_at",
    },
  ]);
  const isMobile = useIsMobile();
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: isMobile ? 10 : 12,
  });
  React.useEffect(() => {
    setPagination({
      ...pagination,
      pageSize: isMobile ? 10 : 12, // Non-mobile value could be 20, but for demo we want to see the pagination
    });
  }, [isMobile]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        {toolbar(table)}
        <ViewSwitcher isCardView={isCardView} setIsCardView={setIsCardView} />
      </div>
      {isCardView ? (
        <CardView table={table} card={card} />
      ) : (
        <TableView table={table} columns={columns} />
      )}
      {table.getRowModel().rows?.length > 0 && (
        <DataTablePagination table={table} isCardView={isCardView} />
      )}
    </div>
  );
}

function CardView<TData>({
  table,
  card,
}: {
  table: TableType<TData>;
  card?: (data: TData, id: string) => React.ReactNode;
}) {
  return (
    <div className="@container">
      {table.getRowModel().rows?.length ? (
        <div className="grid @md:grid-cols-1 @lg:grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-2 @3xl:grid-cols-2 @4xl:grid-cols-3 @5xl:grid-cols-3 @6xl:grid-cols-3 @7xl:grid-cols-4 gap-3">
          {table.getRowModel().rows.map((row) => {
            const item = row.original;
            return card && card(item, row.id);
          })}
        </div>
      ) : (
        <div className="bg-white text-zinc-900 rounded-md border overflow-x-hidden max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-6rem)]">
          <Table>
            <TableBody>
              <NoResultsRow colSpan={1} />
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function TableView<TData, TValue>({
  table,
  columns,
}: {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
}) {
  return (
    <div className="bg-white text-zinc-900 rounded-md border overflow-x-hidden w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-6rem)]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`${
                      cell.column.columnDef.size === 100 ? "w-full" : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <NoResultsRow colSpan={columns?.length} />
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function NoResultsRow({ colSpan }: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
}

function ViewSwitcher({
  isCardView,
  setIsCardView,
}: {
  isCardView: boolean;
  setIsCardView: (isCardView: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2 ml-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={isCardView ? "ghost" : "outline"}
            onClick={() => setIsCardView(false)}
          >
            <Table2 className="h-4 w-4" />
            <span className="sr-only">Table</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Table</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant={isCardView ? "outline" : "ghost"}
            onClick={() => setIsCardView(true)}
          >
            <IdCard className="h-4 w-4" />
            <span className="sr-only">Cards</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Cards</TooltipContent>
      </Tooltip>
    </div>
  );
}
