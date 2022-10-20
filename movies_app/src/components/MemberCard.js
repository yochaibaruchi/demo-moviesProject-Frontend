import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import httpService from "../httpService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, } from "react";

function MemberCard(props) {

    const dispatch = useDispatch()
    const [unWachedMovies, setUnWachedMovies] = useState([])
    const [memberID, setMemberID] = useState()
    const [flag, setFlag] = useState(true)
    const [formflag, setFormFlag] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const storeData = useSelector(state => state)

    //get member unWatched movies
    useEffect(() => {
        setMemberID(props.member._id)
        const filterMovies = () => {
            let array = storeData.movies.filter(mov => {
                return !props.member.Movies.find(x => mov._id === x._id)
            })

            setUnWachedMovies(array)
        }
        filterMovies()
    }, [storeData])




    //delete memberfunction
    const deleteMember = async () => {
        try {
            await httpService.deleteData("http://localhost:3000/api/members/" + props.member._id)
            dispatch({ type: "deleteMember", payload: props.member._id })
        } catch (error) {
            alert('somthing went wrong')
        }
    }


    //on submit
    const onSubmit = async (data) => {
        const obj = {
            MemberID: memberID,
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
        navigate('/EditMember/' + props.member._id)
    }

    return (
        <div>
            <div className="card rounded mx-auto d-block" style={{ width: "24rem" }}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card-body">
                                <h4 className="card-title">Name: {props.member.Name}</h4>
                                <h6 className="card-title">Email: {props.member.Email}</h6>
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
                                    {props.member.Movies.map((m) => {
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
                        </div>

                    </div>
                </div>
            </div>
            <br />
        </div>
    )
}

export default MemberCard;



