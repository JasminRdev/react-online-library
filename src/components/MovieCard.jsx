import { useState, useEffect } from "react";
import {useMovieContext} from "../context/MovieContext"
import './movieCard.styles.css'
import noImage from "../assets/noBook.png";
function MovieCard({movie}){
    // const favIniStyle = {
    //     border: '2px solid black',
    //     padding: '10px',
    //     margin: '10px'
    //   };
    // const favActiveStyle = {
    //     ...favIniStyle,
    //     border: '2px solid green',
    //     padding: '10px',
    //     margin: '10px',
    //     background: "green"
    // };
    const {isFav, addFav, removeFav, addNote, getNoteText, removeNote, isClickedBook,addClickedBook} = useMovieContext()
    
    const [usersText, setUsersText] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [descrActive, setDescrActive] = useState(false)
    
    const fav = isFav(movie.id)
    const clickedDescBook = isClickedBook(movie.id)
    const note = getNoteText(movie.id)
    const [noteEditActive, setNoteEditActive] = useState(false)
    // const [whichMovie, setWhichMovie] = useState("")
    console.log("clickedDescBook ",clickedDescBook, movie.id)
    console.log("fav ",fav, movie.id)
    function onFavClick(e){
        console.log("Clicked")
        e.preventDefault();
        if(fav) removeFav(movie.id)
            else addFav(movie)
    }
    function onClickedBook(e){
        console.log("Clicked book to see desc")
        e.preventDefault();
        addClickedBook(movie)
    }

    function onNoteIconClick(e){
        e.preventDefault();
        setNoteEditActive(true);
    }

    function handleRemoveNote(e){
        e.preventDefault();
        removeNote(movie.id);
        
        setNoteEditActive(false);
    }
    const handleNoteSubmit = async(event) => {
        event.preventDefault();
        if(!usersText.trim()) return
        try{
            addNote(movie.id, usersText)
        } catch(err){
            console.log("err",err)
            console.log(error)
            setError("Failed to get books... reload please")
        } finally{
            setLoading(false)
            console.log(loading)
            setNoteEditActive(false)
        }
    }
    // console.log("wh", whichMovie)
     
    useEffect(() => {
        const handleClick = (e) => {
            console.log("clciked", e.target)
            if (e.target.closest(".close-note")) {
                setNoteEditActive(false);
            } else if (e.target.closest(".book-note")) {
                setNoteEditActive(true);
            } else if (e.target.closest("#close-description")) {
                setDescrActive(false);
            } else if (e.target.closest(".open-descr")) {
                setDescrActive(true);
                // onClickedBook(e);
                // setWhichMovie(movie.id);
            }
        };
        document.addEventListener("click", handleClick);
    
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [movie.id]);

    const favIconClass = `${fav ? 'fav-btn fav--active' : 'fav-btn'} ${!window.location.href.includes("/favorites") && "at-home"}`

    return <div className={noteEditActive ? 'movie-card modal-open' : 'movie-card'}>
                <div className="open-descr" onClick={onClickedBook}>Open description
                </div>  
                {noteEditActive &&
                    <div className="overlay">
                        <div className="note-modal">
                        <svg className="close-note" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#1C274C"></path> </g></svg>
                            <form className="note-form" onSubmit={handleNoteSubmit}>
                                <h4>Add/Update your note at book</h4>
                                <h2>{movie.volumeInfo.title}</h2>
                                <textarea 
                                    rows="5" cols="33"  
                                    type="text" placeholder="Add your thoughts..." className="note-input" 
                                    value={usersText}
                                    onChange={(e) => setUsersText(e.target.value)} 
                                    >
                                </textarea>
                                <div className="notes-btn">
                                    <button type="submit">Submit note</button>
                                    <button className="del-note" onClick={handleRemoveNote} >Delete Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            {
                // (descrActive && whichMovie === movie.id) &&
                (descrActive && clickedDescBook) &&
                <div className="overlay">  
                    <svg className="close" id="close-description" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="#1C274C"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#1C274C"></path> </g></svg>
                    <div className="info">  
                        <div className="info-heading">
                            <h2>{movie.volumeInfo.title}</h2>
                            <span>{movie.volumeInfo.subtitle}</span>
                        </div>
                        <h4>Author: {movie.volumeInfo.authors}</h4>
                        <p>Categories: {movie.volumeInfo.categories}</p>
                        <p>Published: {movie.volumeInfo.publishedDate}</p>
                        <p>{movie.volumeInfo.description}</p>
                    </div>
                </div>
            }
            <div className="movie-polster">
                {!movie.volumeInfo.imageLinks?.thumbnail ? 
                    <img src={noImage} class="no-image" alt={movie.volumeInfo.title} />
                    :
                    <img src={movie.volumeInfo.imageLinks?.thumbnail} alt={movie.volumeInfo.title} />
                }
                <div className="movie-overlay">
                    <button className={favIconClass} onClick={onFavClick}>
                    <svg width="800px" height="800px" viewBox="0 0 15 15" version="1.1" id="heart" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75&#xA;&#x9;C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z"/>
                    </svg>
                    </button>
                    {
                    window.location.href.includes("/favorites") && 
                        <button className={note ? 'note-btn note--exist' : 'note-btn'} onClick={onNoteIconClick}>
                            <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 503.607 503.607" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M324.427,212.255c-3.231-3.223-8.486-3.215-11.7,0l-24.366,23.292l36.151,36.151l26.834-26.834 c1.024-1.024,1.175-2.224,1.175-2.845c0-0.621-0.151-1.813-1.175-2.837L324.427,212.255z"></path> <polygon points="188.312,331.185 226.67,369.543 312.644,283.569 276.225,247.15 "></polygon> <polygon points="171.058,386.661 210.256,376.866 180.854,347.463 "></polygon> <path d="M386.098,58.754h-41.967v-8.511c0-9.191-7.529-16.669-16.787-16.669h-25.18v-8.511C302.164,11.239,290.858,0,276.975,0 h-50.352c-13.883,0-25.18,11.239-25.18,25.063v8.511h-25.18c-9.258,0-16.787,7.479-16.787,16.669v8.511h-41.967 c-23.141,0-41.967,18.827-41.967,41.967v360.918c0,23.141,18.826,41.967,41.967,41.967h268.59 c23.132,0,41.967-18.827,41.967-41.967V100.721C428.066,77.581,409.231,58.754,386.098,58.754z M176.262,67.148V50.361h33.574 c4.633,0,8.393-3.76,8.393-8.393V25.063c0-4.642,3.685-8.276,8.393-8.276h50.352c4.709,0,8.402,3.634,8.402,8.276v16.904 c0,4.633,3.752,8.393,8.393,8.393l33.574-0.117l-0.134,58.872H176.262V67.148z M363.209,256.739L230.962,388.986l-67.156,16.795 l-6.748,6.748c-1.637,1.637-3.785,2.459-5.934,2.459c-2.14,0-4.289-0.823-5.934-2.459c-3.273-3.282-3.273-8.595,0-11.877 l6.748-6.74l16.82-67.248l132.23-126.405c9.636-9.636,25.533-9.636,35.303,0.126l26.918,26.918 c3.928,3.928,6.102,9.157,6.102,14.722C369.311,247.581,367.138,252.81,363.209,256.739z"></path> </g> </g> </g> </g></svg>
                        </button>
                    }
                </div>
            </div>
            <div className="movie-info">
                <h4>{movie.volumeInfo.title}</h4>
                {note && <p className="book-note">{note.slice(0,20)}...</p>}
            </div>
        </div>

}

export default MovieCard;