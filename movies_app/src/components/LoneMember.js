import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import httpService from "../httpService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, } from "react";

function LoneMember() {
    const { id } = useParams()
    const storeData = useSelector(state => state)
    const dispatch = useDispatch()
    const [formflag, setFormFlag] = useState(false)
    const [unWachedMovies, setUnWachedMovies] = useState([])
    const [member, setMember] = useState({})
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        const getUnWatchedMovies = async () => {
            setMember(storeData.members.find(x => x._id === id))
            const data = await httpService.getdataWithAuth("http://localhost:3000/api/members/unWatched/" + id)
            if (!data.auth) {
                navigate('/')
            } else {
                setUnWachedMovies(data.myData)
            }
        }
        getUnWatchedMovies()
    }, [storeData])

    //delete memberfunction
    const deleteMember = async () => {
        try {
            await httpService.deleteData("http://localhost:3000/api/members/" + id)
            dispatch({ type: "deleteMember", payload: id })
        } catch (error) {
            alert('somthing went wrong')
        }
    }


    const backToMovies = () => {
        navigate('/Movies')
    }

    //on submit
    const onSubmit = async (data) => {
        const obj = {
            MemberID: id,
            MovieID: data.movies,
            Date: data.time
        }
        try {
            await httpService.addData("http://localhost:3000/api/subscriptions", obj)
            dispatch({ type: "subs", payload: obj })
        }
        catch (error) {
            alert("somthing went wrong")
        }
    }
    const nav = () => {
        navigate('/EditMember/' + id)
    }

    return (
        <div>
            <div className="card rounded mx-auto d-block" style={{ width: "24rem" }}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card-body">
                                <h4 className="card-title">Name: {member?.Name}</h4>
                                <h6 className="card-title">Email: {member?.Email}</h6>

                                <button onClick={() => setFormFlag(!formflag)} className="btn btn-secondary" >subscribe</button>
                                {
                                    formflag === true && <div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <select {...register("movies", { required: true })}>
                                                <option value={null} disabled  >pick movie</option>
                                                {unWachedMovies?.map((m, index) => {
                                                    return <option key={index} value={m._id} >{m.Name}</option>
                                                })}
                                            </select>
                                            {errors?.movies?.type === "required" && <p className="p">This field is required</p>}
                                            <input type="datetime-local" placeholder="time" {...register("time", { required: true })} />
                                            {errors?.time?.type === "required" && <p className="p">This field is required</p>}
                                            <input type="submit" />
                                        </form>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="col">
                            <div style={{ borderBottom: "1px solid rgb(79, 98, 148)" }} >
                                <h5 className="card-title">movies watched</h5>
                                <ul>
                                    {member?.Movies?.map((m) => {
                                        return <li key={m._id}><span> <Link className="nav-link" to={"/LoneMovie/" + m._id}>{m.Name}</Link> ,{m.Date.slice(0, 10)} </span></li>
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
                                <button type="button" onClick={deleteMember} className="btn btn-secondary">Delete</button>
                            </div>
                            <div className="col">
                                <button type="button" onClick={backToMovies} className="btn btn-secondary">back</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <br />
        </div>
    )

}


export default LoneMember