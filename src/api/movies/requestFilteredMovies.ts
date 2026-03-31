import supabase from "#/config/supabaseClientVite";
import type { FilteredMovies } from "#/types/movie.types.ts/FilteredMovies";

export const requestFilteredMovies = async ({
  filters,
  range,
}: FilteredMovies) => {
  try {
    let query = supabase
      .from("movies")
      .select("*", { count: "exact" })
      .range(range.from, range.to);
    if (filters.genre) {
      query = query.or(`genre.cs.["${filters.genre}"]`);
    }
    if (filters.search) {
      query = query.ilike("title", `%${filters.search}%`);
    }
    return query;
  } catch (error) {
    throw Error;
  }
};
