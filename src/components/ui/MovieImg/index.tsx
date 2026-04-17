import "./index.css";
import { IoBookmarkOutline } from "react-icons/io5";
import Btn from "#/components/ui/btn";
import { IoBookmark } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { requestSaveBookmarkMovie } from "#/api/movies/requestSaveBookmarkMovie";
import { requestRemoveBookmarkMovie } from "#/api/movies/requestRemoveBookmarkMovie";
import { useBookMovie } from "#/hooks/useBookMovie";

const MovieImg = ({ movie, table }) => {
  const { id, image: src, isSaved } = movie;
  const navigate = useNavigate();
  const { mutate: saveMovie } = useBookMovie(id, table);

  const handleSaveMovie = () => {
    const handler = () => {
      if(isSaved) return requestRemoveBookmarkMovie(id) 
      else if(!isSaved) return requestSaveBookmarkMovie(movie);
    };
    saveMovie(handler);
  };
  const openMovie = () => navigate(`/movie/${id}`);

  return (
    <article className="movie-img">
      <div className="movie-img-overlay">
        <Btn
          type="button"
          onClick={handleSaveMovie}
          variation="secondary-small"
        >
          {isSaved ? (
            <IoBookmark className="checked-bookmark" />
          ) : (
            <IoBookmarkOutline className="unChecked-bookmark" />
          )}
        </Btn>
        {id && (
          <a onClick={openMovie}>
            See more <IoSearchOutline />
          </a>
        )}
      </div>
      <img src={src} />
    </article>
  );
};
export default MovieImg;
