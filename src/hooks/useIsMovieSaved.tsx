import { requestSavedMovies } from "#/api/movies/requestSavedMovies";
import { useQuery } from "@tanstack/react-query";

export const useIsMovieSaved = (id: string) => {
  const { data: movies } = useQuery({
    queryKey: ["savedMovies"],
    queryFn: () => requestSavedMovies(),
  });

  const isSaved = movies?.data.some((movie: { movie_id: string }) => movie.movie_id === id) ?? false;

  return { isSaved: isSaved };
};
