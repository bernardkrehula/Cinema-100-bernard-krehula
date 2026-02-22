import SliderImg from '#/pages/homepage/slider/SliderImg';
import './index.css'

const MovieIcon = ({id, image}: {id: string; image: string}) => {
   
    return(
        <div className='movie-icon'>
            <SliderImg id={id} src={image}/>
        </div>
    )
}
export default MovieIcon;