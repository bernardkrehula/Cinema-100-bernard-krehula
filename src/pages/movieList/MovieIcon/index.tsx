import SliderImg from "#/pages/homepage/slider/SliderImg";
import "./index.css";
import { FaStar } from "react-icons/fa";

type MovieIconType = {
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
};

const MovieIcon = (page: MovieIconType) => {
  const { id, image, title, year, rating, genre } = page;

  return (
    <div className="movie-icon">
      <SliderImg id={id} src={image} />
      <h3>{title}</h3>
      <div className="movie-icon-info">
        <h4>{year}</h4>
        <FaStar className="rating-star" />
        <h4>{rating}</h4>
        <ul>
          {genre.map((type: string, index: number) => (
            <li key={index}>
              {type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MovieIcon;
