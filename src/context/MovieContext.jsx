import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext() 

export const useMovieContext = () => useContext(MovieContext)
export const MovieProvider = ({children}) => {
    const [fav, setFav] = useState([])
    const [clickedBook, setClickedBook] = useState([])
    const [notes, setNotes] = useState([])
   
    useEffect(() => {
        const storedFavs = localStorage.getItem("fav");
        if(storedFavs) setFav(JSON.parse(storedFavs))
            
        const storedClickedBook = localStorage.getItem("clickedBook");
        if(storedClickedBook) setClickedBook(JSON.parse(storedClickedBook))
            
        const storedNotes = localStorage.getItem("notes");
        if(storedNotes) setNotes(JSON.parse(storedNotes))
    },[]);

    useEffect(() => {
        localStorage.setItem("fav", JSON.stringify(fav))
    },[fav])
    useEffect(() => {
        localStorage.setItem("clickedBook", JSON.stringify(clickedBook))
    },[clickedBook])
    
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    },[notes])

    const addFav = (movie) => {
        setFav(prev => [...prev, movie])
    }
    
    const addClickedBook = (movie) => {
        setClickedBook([movie])
    }

    const removeFav = (movieId) => {
        setFav(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFav = (movieId) => {
        return fav.some(movie => movie.id === movieId)
    }
    const isClickedBook = (bookId) => {
        return clickedBook.some(book => book.id === bookId)
    }

    //notes
    const addNote = (movieId, text) => {
        setNotes((prev) => {
            if(prev.some((movie) => movie.id === movieId)){
                return prev.map((movie) => 
                    movie.id === movieId ? {...movie, text} : movie
                );
            } else {
                return [...prev, {id:movieId, text}];
            };
        });
    };

    const removeNote = (movieId) => {
        setNotes(prev => prev.filter(movie => movie.id !== movieId))
    }

    const getNoteText = (movieId) => {
        const found = notes.find(note => note.id === movieId)
        return found ? found.text : "";
    }

    const value = {
        fav, 
        clickedBook,
        addFav,
        addClickedBook,
        removeFav,
        isFav,
        isClickedBook,
        notes,
        removeNote,
        addNote,
        getNoteText
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>

}

