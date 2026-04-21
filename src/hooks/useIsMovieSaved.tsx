import { requestSavedMovies } from "#/api/movies/requestSavedMovies";
import { useQuery } from "@tanstack/react-query";

export const useIsMovieSaved = (id: string) => {
  const { data: movies } = useQuery({
    queryKey: ["savedMovies"],
    queryFn: () => requestSavedMovies(),
  });

  const isSaved = movies?.data.some((movie: { id: string}) => movie.id === id) ?? false;
  return { isSaved: isSaved };
};
