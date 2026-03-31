export type FilteredMovies = {
  filters: { search: string; genre: string | null };
  range: { from: number; to: number };
};