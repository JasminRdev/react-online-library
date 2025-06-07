import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchOnes, getPopulareOnes } from "../services/api";

import './home.styles.css'

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(error, loading, movies, searchOnes)
    useEffect(() => {
        const loadPopularBooks = async () => {
            try{
                const pop = await getPopulareOnes();
                setMovies(pop)
                console.log("pop ",pop)
            } catch (error){
                console.log("err", error)
                setError("Failed to load books... try to refresh")

            }
            finally{
                setLoading(false)
            }
        }
        loadPopularBooks()
    },[]);
    const handleSearch = async(event) => {
        event.preventDefault();
        if(!searchQuery.trim()) return
        try{
            const searchRes = await searchOnes(searchQuery)
            setMovies(searchRes)

        } catch(error){
            console.log("err",error)
            setError("Failed to get books... reload please")
        } finally{
            setLoading(false)
        }

    }
    return(
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input type="text" placeholder="Search for books..." className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                >
                
                </input>
                <button type="submit" className="search-btn" >Search
                
                </button>
            </form>
            <div className="movies-grid">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        </div>
        
    )

}

export default Home