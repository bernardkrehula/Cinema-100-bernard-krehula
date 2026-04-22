import type { MoviesResponse } from "#/types/movie.types.ts/MoviesResponseType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBookMovie = (table: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (handler: () => void) => handler(),

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
