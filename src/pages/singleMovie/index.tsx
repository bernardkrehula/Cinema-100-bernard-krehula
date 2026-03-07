import { useParams } from "react-router";
import "./index.css";
import { requestSingleMovie } from "#/api/requestSingleMovie";
import { useQuery } from "@tanstack/react-query";
import NavBar from "#/components/layouts/navbar";
import { FaStar } from "react-icons/fa";
import SliderImg from "../homepage/slider/SliderImg";

const SingleMovie = () => {
  const { movieID } = useParams();
  const { data: movie } = useQuery({
    queryKey: [`movie-${movieID}`],
    queryFn: () => requestSingleMovie(movieID),
  });

  if (!movie) return;
  const {
    id,
    title,
    rank,
    genre,
    description,
    director,
    writers,
    image,
    trailer,
    rating,
    year,
  } = movie;

  return (
    <div className="single-movie" key={id}>
      <NavBar />
      <div className="single-movie-content">
        <div className="movie-textual-info-top">
          <div className="movie-title">
            <h1>{title}</h1>
            <span>({year})</span>
          </div>
          <div className="movie-rating">
            <h2>Imdb rating</h2>
            <FaStar className="rating-star" />
            <span>{rating}</span>
            <span className="movie-rating-max-points"> / 10</span>
          </div>
          <div className="movie-rank">
            <h2>Rank</h2>
            <span>{rank}</span>
            <span className="movie-rank-max-points"> / 100</span>
          </div>
        </div>
        <div className="movie-frame">
          <SliderImg src={image} />
          <iframe src={trailer} title="Movie trailer" allowFullScreen />
        </div>
        <article className="movie-textual-info-bottom">
          <ul className="genre">
            {genre.map((type: string, index: number) => (
              <li key={index}>
                {type}
                {index < genre.length - 1 && <span>,&nbsp;</span>}
              </li>
            ))}
          </ul>
          <p className="genre-description">{description}</p>
          <hr />
          <dl>
            <dt className="director">Director</dt>
            <dd className="director-info">{director}</dd>
            <hr />
            <dt className="writers">Writers</dt>
            <ul className="writers-info">
              {writers.map((type: string, index: number) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </dl>
        </article>
      </div>
    </div>
  );
};
export default SingleMovie;
