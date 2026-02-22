import SliderImg from '#/pages/homepage/slider/SliderImg';
import './index.css'

type MovieIconType = {
  id: string
  title: string
  imdbid: string
  rank: number
  genre: string[]
  description: string
  director: string[]
  writers: string[]
  image: string
  trailer: string
  thumbnail: string
  rating: number
  year: number
}

const MovieIcon = (page: MovieIconType) => {
    console.log(page)
    const { id, image } = page;
    return(
        <div className='movie-icon'>
            <SliderImg id={id} src={image}/>
        </div>
    )
}
export default MovieIcon;