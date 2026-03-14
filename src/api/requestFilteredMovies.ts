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

    if (filters.genre) {
      query = query.contains("genre", [filters.genre]);
    }
    if (filters.search) {
      query = query.ilike("title", `%${filters.search}%`);
    }

    const { data } = await query;

    return data;
  } catch (error) {
    throw Error;
  }
};
