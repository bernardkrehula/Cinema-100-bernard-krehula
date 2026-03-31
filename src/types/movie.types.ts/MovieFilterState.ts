export type MovieFilterState = {
  filters: {
    search: string;
    genre: string | null;
  };
  range: {
    from: number;
    to: number;
  };
};