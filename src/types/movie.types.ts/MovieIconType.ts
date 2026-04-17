export type MovieIconType = {
  id: string;
  title: string;
  imdbid: string;
  rank: number;
  genre: string[];
  description: string;
  director: string;
  writers: string;
  image: string;
  trailer: string;
  thumbnail: string;
  rating: number;
  year: number;
  isSaved: boolean;
  user_id?: string;
};