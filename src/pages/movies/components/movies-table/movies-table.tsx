import { DataTable } from "@/components/table/components/data-table";
import { useGetMovies } from "../../api/movies-get";
import { columns } from "./columns";
import { DataTableToolbar } from "./data-table-toolbar";
import { PaginationState, Table as TableType } from "@tanstack/table-core";
import { DataTableSkeletons } from "@/components/skeletons/skeletons";
import { MovieCard } from "./movie-card";
import { Movie } from "../../types";
import { useState } from "react";
import debounce from "lodash.debounce";

export default function MoviesTable() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });
  const { data, isLoading } = useGetMovies(pagination, search);
  const { items: movies, total } = data || { items: [], total: 0 };

  const debouncedSearch = debounce((value: string) => setSearch(value), 300);

  if (isLoading) {
    return <DataTableSkeletons isCardView />;
  }

  return (
    <DataTable
      data={movies || []}
      columns={columns}
      toolbar={(table: TableType<Movie>) => (
        <DataTableToolbar table={table} onSearchChange={debouncedSearch} />
      )}
      card={(movie, id) => <MovieCard key={id} movie={movie} />}
      isCardView
      initialSortingKey="id"
      onPaginationChange={setPagination}
      pagination={pagination}
      totalCount={total}
    />
  );
}
