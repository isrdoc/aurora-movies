import { useQuery } from "@tanstack/react-query";
import { mockMovies as movies } from "./movies";
import { Movie } from "../types";

export function useGetMovies() {
  return useQuery({ queryKey: ["movies"], queryFn: getMovies });
}

async function getMovies() {
  return mockMovies(movies as Movie[]);
}

function mockMovies(data: Movie[]) {
  return [...movies, ...data];
}
