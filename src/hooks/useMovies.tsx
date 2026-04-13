import { requestFilteredMovies } from "#/api/movies/requestFilteredMovies";
import type { FilteredMovies } from "#/types/movie.types.ts/FilteredMovies";
import { useQuery } from "@tanstack/react-query";

export const useMovies = (movieFilter: FilteredMovies) => {
  const { filters: { table: queryKey }} = movieFilter;

  const { data, refetch } = useQuery({
    queryKey: [queryKey],
    queryFn: () => requestFilteredMovies(movieFilter),
  });

  return {data, refetch};
};
