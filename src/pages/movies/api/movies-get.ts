import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/table-core";
import { Movie } from "../types";

interface GetMoviesResponse {
  items: Movie[];
  total: number;
}

export function useGetMovies(pagination: PaginationState) {
  return useQuery({
    queryKey: ["movies", pagination],
    queryFn: async () => {
      const response = await fetch(
        `https://november7-730026606190.europe-west1.run.app/movies?skip=${
          pagination.pageIndex * pagination.pageSize
        }&limit=${pagination.pageSize}`
      );
      const data = await response.json();
      return data || ({ items: [], total: 0 } as GetMoviesResponse);
    },
    placeholderData: keepPreviousData,
  });
}
