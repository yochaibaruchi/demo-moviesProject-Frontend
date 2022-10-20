import httpService from "../httpService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
function LoneMovie() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const storeData = useSelector(state => state)
    const [movie, setMovie] = useState()

    useEffect(() => {
        const auth = async () => {
            const resp = await httpService.Auth()
            if (!resp) {
                navigate('/')
            }
        }
        auth()
        setMovie(storeData.movies.find(x => x._id === id))
    }, [])


    const nav = () => {
        navigate('/EditMovie/' + id)
    }

    const deleteMovie = async () => {
        try {
            await httpService.deleteData("http://localhost:3000/api/movies/" + id)
            dispatch({ type: "deleteMovie", payload: id })
            navigate('/Movies')
        } catch (error) {
            alert("something went wrong")
        }


    }



    return (
        <div>
            <div className="card rounded mx-auto d-block" style={{ width: "24rem" }}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img style={{ height: "15rem", width: "10rem" }} src={movie?.Img} className="card-img-top" alt="movie" />
                            <div className="card-body">
                                <h5 className="card-title">{movie?.Name}</h5>
                                <h6 className="card-title">{movie?.premiered}</h6>
                                genres : {movie?.Genres}
                            </div>
                        </div>
                        <div className="col">
                            <div style={{ borderBottom: "1px solid rgb(79, 98, 148)" }} >
                                <h5 className="card-title">subscribes</h5>
                                <ul>
                                    {movie?.members.map((mem) => {
                                        return <li key={mem._id}>
                                            <span>  <Link to={'/LoneMember/' + mem._id} className="nav-link">{mem.Name}</Link>, {mem.Date.slice(0, 10)} </span>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="row g-3">
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={nav}>Edit</button>
                            </div>
                            <div className="col">
                                <button type="button" onClick={deleteMovie} className="btn btn-secondary">Delete</button>
                            </div>
                            <div className="col">
                                <button type="button" onClick={() => navigate('/Movies')} className="btn btn-secondary">back</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <br />
        </div>
    )


}


export default LoneMovie;