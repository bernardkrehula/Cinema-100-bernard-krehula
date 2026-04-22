import supabase from "#/config/supabaseClientVite";
import type { FilteredMovies } from "#/types/movie.types.ts/FilteredMovies";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestFilteredMovies = async ({
  filters,
  range,
}: FilteredMovies) => {
  const { table } = filters;

  const {
    data: {
      session: {
        user: { id: user_id },
      },
    },
  } = await supabase.auth.getSession();

  let query = supabase.from(table).select("*", { count: "exact" });

  if ((await query).data[0].user_id) {
    query = query.eq("user_id", user_id);
  }

  query.range(range.from, range.to);

  const moviesId = (await query).data.map(({ movie_id }) => movie_id);

  if ((await query).data[0]?.user_id) {
    query = supabase
      .from("movies")
      .select("*", { count: "exact" })
      .in("id", moviesId);
  }

  if (filters.genre) {
    if ((await query).data[0]?.user_id) {
      query = supabase
        .from("movies")
        .select("*", { count: "exact" })
        .in("id", moviesId)
        .or(`genre.cs.["${filters.genre}"]`);
    } else query = query.or(`genre.cs.["${filters.genre}"]`);
  }
  if (filters.search) {
    if ((await query).data[0]?.user_id) {
      query = supabase
        .from("movies")
        .select("*", { count: "exact" })
        .in("id", moviesId)
        .ilike("title", `%${filters.search}%`);
    } else query = query.ilike("title", `%${filters.search}%`);
  }

  const result = await query;

  if (result.error) {
    if (isAuthApiError(result.error)) {
      throw result.error;
    } else {
      throw new GenericError();
    }
  }

  return query;
};
