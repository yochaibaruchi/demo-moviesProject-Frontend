import httpService from "../httpService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function MovieCard(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const nav = () => {
        navigate('/EditMovie/' + props.movie._id)
    }
    const deleteMovie = async () => {
        try {
            await httpService.deleteData("http://localhost:3000/api/movies/" + props.movie._id)
            dispatch({ type: "deleteMovie", payload: props.movie._id })
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
                            <img style={{ height: "15rem", width: "10rem" }} src={props.movie.Img} className="card-img-top" alt="movie" />
                            <div className="card-body">
                                <h5 className="card-title">{props.movie.Name}</h5>
                                <h6 className="card-title">{props.movie.premiered}</h6>
                                genres : {props.movie.Genres}
                            </div>
                        </div>
                        <div className="col">
                            <div style={{ borderBottom: "1px solid rgb(79, 98, 148)" }} >
                                <h5 className="card-title">subscribes</h5>
                                <ul>
                                    {props.movie.members.map((mem) => {
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
                        </div>

                    </div>
                </div>
            </div>
            <br />
        </div>
    )


}


export default MovieCard;