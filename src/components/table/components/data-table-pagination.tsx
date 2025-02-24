import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataTablePagination<TData>({
  table,
  isCardView,
}: {
  table: Table<TData>;
  isCardView: boolean;
}) {
  return (
    <div className="text-zinc-900 flex items-center justify-between">
      <RowsSelected table={table} />
      <div className="flex flex-col-reverse sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-8">
        <div className="mt-1">
          <ItemsPerPageSelect table={table} isCardView={isCardView} />
        </div>
        <PageNavigator table={table} />
      </div>
    </div>
  );
}

function RowsSelected<TData>({ table }: { table: Table<TData> }) {
  return (
    <>
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      ) : (
        <div className="flex-1 text-sm text-muted-foreground" />
      )}
    </>
  );
}

function ItemsPerPageSelect<TData>({
  table,
  isCardView,
}: {
  table: Table<TData>;
  isCardView: boolean;
}) {
  return (
    <div className="flex items-center space-x-5 sm:space-x-2">
      <p className="text-brandText text-sm font-medium">
        {isCardView ? "Cards per page" : "Rows per page"}
      </p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px] bg-white">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[3, 6, 10, 12, 16, 20, 30, 40, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function PageNavigator<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className="flex items-center space-x-0 sm:space-x-2">
      <div className="text-brandText flex w-[100px] items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center space-x-1.5 sm:space-x-1">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
