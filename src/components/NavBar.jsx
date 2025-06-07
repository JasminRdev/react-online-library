import {Link} from "react-router-dom"
import './navbar.styles.css'
function NavBar() {
    // const mainStyle = {
    //    display: 'flex',
    //     justifyContent: 'space-between',
    // 	border: 'red 1px solid',
    //     width: '100%',
    //     padding: '30px'
    //   };
      
    // const favActiveStyle = {
    //     ...favIniStyle,
    //     border: '2px solid green',
    //     padding: '10px',
    //     margin: '10px',
    //     background: "green"
    // };
    return(

        <nav>
            <div>
                <Link to="/">Book App</Link>
            </div>
            
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </div>
        </nav>
    )
}

export default NavBar;