import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

function NavBar() {

    const storeData = useSelector(state => state)




    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <span className="navbar-brand" >movies.com</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to='/Movies'>Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/Members'>Members</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => sessionStorage.clear()} to='/'>Logout</Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        hello, {storeData.user}
                    </span>
                </div>
            </div>
        </nav>
    )


}


export default NavBar