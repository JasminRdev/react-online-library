import { useMovieContext } from "../context/MovieContext"
import MovieCard from "../components/MovieCard"
import {Link} from "react-router-dom"

import './fav.styles.css'
function Fav() {
    const {fav} = useMovieContext();
    if(fav[0]){
        return(
            <div className="fav">
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                {fav.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
                </div> 
            </div> 
        )
    } else {
        return(
            <div className="fav-container">
                <div className="no-fav">No Favorites saved</div> 
                <p>Go to {'\u00A0'} <Link to="/"> Home</Link></p>
            </div>
        )    
    }
   
}

export default Fav