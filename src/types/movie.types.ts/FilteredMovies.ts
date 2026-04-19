export type FilteredMovies = {
  filters: { search: string; genre: string | null, table: string };
  range: { from: number; to: number };
};