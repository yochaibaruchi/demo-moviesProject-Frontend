import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Link, useNavigate } from "react-router-dom"
import httpService from "../httpService";
import { useState, useEffect } from "react";
function Movies() {
    const [searchInput, setSearchInput] = useState('')
    const storeData = useSelector(state => state)
    const navigate = useNavigate()

    // check for authentication.
    useEffect(() => {
        const auth = async () => {
            const resp = await httpService.Auth()
            if (!resp) {
                navigate('/')
            }
        }
        auth()
    }, [])


    const search = (e) => {
        setSearchInput(e.target.value.toLowerCase())
    }



    return (
        <div>
            <NavBar />
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to={"/Movies"} aria-current="page" >Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/AddMovie"} >Add Movie</Link>
                            </li>
                        </ul>
                    </div>
                    <input style={{ width: "15%" }} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={search} />
                </div>
            </nav>
            <div className="rounded mx-auto d-block">
                {storeData.movies.filter(x => x.Name.toLowerCase().startsWith(searchInput)).map((m) => {
                    return <MovieCard key={m._id} movie={m} />
                })}
            </div>
        </div>
    )
}

export default Movies;

