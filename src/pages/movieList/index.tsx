import { useEffect } from 'react'
import './index.css'
import { reuqestMovieList } from '#/api/requestMovieList'

const MovieList = () => {
    console.log('radi')
    useEffect(() => {
        reuqestMovieList();
    })
    return(
        <div className='movie-list'>

        </div>
    )
}
export default MovieList;