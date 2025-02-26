import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { PaginationState } from "@tanstack/table-core";
import axios from "axios";
import { Movie } from "../types";
import { withErrorHandling } from "@/utils/errors";

interface GetMoviesResponse {
  items: Movie[];
  total: number;
}

export function useGetMovies(pagination: PaginationState, search: string) {
  const query: UseQueryResult<GetMoviesResponse> = useQuery({
    queryKey: ["movies", pagination, search],
    queryFn: () =>
      withErrorHandling<GetMoviesResponse>(
        () => getMovies(pagination, search),
        query.data as GetMoviesResponse,
        "Error fetching movies"
      ),
    placeholderData: keepPreviousData,
    retry: false,
  });
  return query;
}

async function getMovies(pagination: PaginationState, search: string) {
  const response = await axios.get(
    `https://november7-730026606190.europe-west1.run.app/movies?skip=${
      pagination.pageIndex * pagination.pageSize
    }&limit=${pagination.pageSize}&query=${search}`
  );
  return response.data || ({ items: [], total: 0 } as GetMoviesResponse);
}
