import MovieImg from "#/components/ui/MovieImg";
import type { MovieIconType } from "#/types/movie.types.ts/MovieIconType";
import "./index.css";
import { FaStar } from "react-icons/fa";

const MovieIcon = ({movie, table}: {movie: MovieIconType, table: string}) => {
  const { title, year, rating, genre } = movie;

  return (
    <li className="movie-icon">
      <MovieImg table={table} movie={movie}/>
      <h3>{title}</h3>
      <div className="movie-icon-info">
        <h4>{year}</h4>
        <FaStar className="rating-star" />
        <h4>{rating}</h4>
        <ul>
          {genre.map((type: string, index: number) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
    </li>
  ); 
};
export default MovieIcon;
