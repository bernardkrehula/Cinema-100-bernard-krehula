import supabase from "#/config/supabaseClientVite";

type FilteredMovies = {
  filters: { search: string; genre: string | null };
  range: { from: number; to: number };
};

export const requestFilteredMovies = async ({
  filters,
  range,
}: FilteredMovies) => {
  try {
    let query = supabase
      .from("movies")
      .select("*", { count: "exact" })
      .range(range.from, range.to);
    console.log(range, filters)
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
