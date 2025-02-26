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
import {
  PaginationState,
  Table as TableType,
  Updater,
} from "@tanstack/table-core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { IdCard, Table2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  toolbar: (table: TableType<TData>) => React.ReactNode;
  card?: (data: TData, id: string) => React.ReactNode;
  isCardView?: boolean;
  initialSortingKey?: string;
  onPaginationChange: (pagination: Updater<PaginationState>) => void;
  pagination: PaginationState;
  totalCount?: number;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  toolbar,
  card,
  isCardView: initialIsCardView = false,
  initialSortingKey = "created_at",
  onPaginationChange,
  pagination,
  totalCount,
}: DataTableProps<TData, TValue>) {
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
      id: initialSortingKey,
    },
  ]);

  React.useEffect(() => {
    onPaginationChange({ pageIndex: 0, pageSize: isCardView ? 6 : 30 });
  }, [isCardView]);

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
    pageCount: totalCount
      ? Math.ceil(totalCount / pagination.pageSize)
      : undefined,
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange,
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
        <div className="grid @md:grid-cols-1 @lg:grid-cols-1 @xl:grid-cols-2 @2xl:grid-cols-2 @3xl:grid-cols-2 @4xl:grid-cols-3 @5xl:grid-cols-3 @6xl:grid-cols-3 @7xl:grid-cols-4 gap-3 gap-y-6">
          {table.getRowModel().rows.map((row) => {
            const item = row.original;
            return card && card(item, row.id);
          })}
        </div>
      ) : (
        <div className="rounded-md border overflow-x-hidden max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-6rem)]">
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
    <div className=" rounded-md border overflow-x-hidden w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-6rem)]">
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
