import { DataTable } from "@/components/table/components/data-table";
import { useGetMovies } from "../../api/movies-get";
import { columns } from "./columns";
import { DataTableToolbar } from "./data-table-toolbar";
import { ColumnDef, Table as TableType } from "@tanstack/table-core";
import { DataTableSkeletons } from "@/components/skeletons/skeletons";
import { MovieCard } from "../movie-card";
import { Movie } from "../../types";

export default function MoviesTable() {
  const { data, error, isLoading } = useGetMovies();

  if (isLoading) {
    return <DataTableSkeletons isCardView />;
  }

  return (
    <DataTable
      data={data as Movie[]}
      columns={columns as ColumnDef<Movie>[]}
      toolbar={(table: TableType<Movie>) => <DataTableToolbar table={table} />}
      card={(movie, id) => <MovieCard key={id} movie={movie} />}
      isCardView
    />
  );
}
