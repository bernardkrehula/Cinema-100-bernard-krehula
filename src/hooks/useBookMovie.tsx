import type { MoviesResponse } from "#/types/movie.types.ts/MoviesResponseType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBookMovie = (id: string, table: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (handler: () => void) => handler(),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [table] });

      const previousMovies = queryClient.getQueriesData({
        queryKey: [table], exact: false
      });
      console.log(table)
      queryClient.setQueriesData(
        { queryKey: [table], exact: false },
        (old: MoviesResponse) => {
          return {
            ...old,
            data: old.data.map((movie) =>
              movie.id === id
                ? {
                    ...movie,
                    isSaved: !movie.isSaved,
                  }
                : movie,
            ),
          };
        },
      );
      return previousMovies;
    },
    onSuccess: () => {
      queryClient.setQueriesData(
        { queryKey: [table], exact: false },
        (old: MoviesResponse) => {
          return {
            ...old,
            data: [],
          };
        },
      );
      queryClient.invalidateQueries();
    },
    onError: (_error, _isSaved, context: unknown) => {
      if (context) {
        queryClient.setQueryData([table], context);
      }
    },
  });
};
