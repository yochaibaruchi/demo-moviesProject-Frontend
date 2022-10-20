import { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import httpService from '../httpService';
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";



function EditMovie() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [movie, setMovie] = useState()
    const { id } = useParams()


    // geting the movie from server for the update.
    useEffect(() => {
        const getMovie = async () => {
            const data = await httpService.getdataWithAuth("http://localhost:3000/api/movies/" + id)
            if (!data.auth) {
                navigate('/')
            } else {
                setMovie(data.myData)
            }

        }
        getMovie()
    }, [])



    const { register, handleSubmit, formState: { errors } } = useForm();
    // on submit function 
    const onSubmit = async (movieData) => {
        const obj = {
            _id: id,
            Name: movieData.Name,
            Genres: movieData.Genres,
            Img: movieData.Img,
            premiered: movieData.premiered
        }
        try {
            await httpService.updateData("http://localhost:3000/api/movies/" + id, movieData)
            dispatch({ type: "updateMovie", payload: obj })
            navigate('/Movies')
        } catch (err) {
            alert("somthing went wrong")
        }

    }
    return (
        <div>
            <NavBar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{
                    fontWeight: "100",
                    color: "white",
                    textAlign: "center",
                    paddingBottom: "10px",
                    borderBottom: "1px solid rgb(79, 98, 148)"
                }}>Edit Movie</h1>
                <label>Name</label>
                <input type="text" defaultValue={movie?.Name} {...register("Name", { required: true })} />
                {errors?.Name?.type === "required" && <p className="p">This field is required</p>}
                <label>Genres</label>
                <input type="text" defaultValue={movie?.Genres}{...register("Genres", { required: true })} />
                {errors?.Genres?.type === "required" && <p className="p">This field is required</p>}
                <label>Img</label>
                <input type="text" defaultValue={movie?.Img}{...register("Img", { required: true })} />
                {errors?.Img?.type === "required" && <p className="p">This field is required</p>}
                <label>premiered</label>
                <input type="number" defaultValue={movie?.premiered} {...register("premiered", { required: true })} />
                {errors?.premiered?.type === "required" && <p className="p">This field is required</p>}
                <p className='p' >you must check and touch all fields </p>
                <input type="submit" />
                <input type={"button"} value="back" onClick={() => navigate('/Movies')} />
            </form>
        </div>
    )



}


export default EditMovie;