import { useParams } from 'react-router'
import './index.css'
import { useEffect } from 'react';

const SingleMovie = () => {
    const id = useParams();
    console.log('radi singlemovie', id.movieID)
    useEffect(() => {

    });
    return(
        <div className='single-movie'>

        </div>
    )
}
export default SingleMovie;