import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import httpService from '../httpService'
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import NavBar from './NavBar';
function AddMovie() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        const auth = async () => {
            const resp = await httpService.Auth()
            if (!resp) {
                navigate('/')
            }
            auth()
        }
    }, [])


    const onSubmit = async (movieData) => {
        try {
            const data = await httpService.addData("http://localhost:3000/api/movies", movieData)
            const obj = {
                _id: data,
                Name: movieData.Name,
                Genres: movieData.Genres,
                Img: movieData.Img,
                premiered: movieData.premiered,
                members: []
            }
            dispatch({ type: "AddMovie", payload: obj })
            navigate('/Movies')

        } catch (error) {
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
                <input type="text" placeholder='Name' {...register("Name", { required: true })} />
                {errors?.Name?.type === "required" && <p className="p">This field is required</p>}
                <label>Genres</label>
                <input type="text" placeholder='inset in this way: Drama,Action,Crime' {...register("Genres", { required: true })} />
                {errors?.Genres?.type === "required" && <p className="p">This field is required</p>}
                <label>Img</label>
                <input type="text" placeholder='jpg file address' {...register("Img", { required: true })} />
                {errors?.Img?.type === "required" && <p className="p">This field is required</p>}
                <label>premiered</label>
                <input type="number" placeholder='only the year' {...register("premiered", { required: true })} />
                {errors?.premiered?.type === "required" && <p className="p">This field is required</p>}
                <p className='p' >you must check and touch all fields </p>
                <input type="submit" />
                <input type={"button"} value="back" onClick={() => navigate('/Movies')} />
            </form>
        </div>
    )



}

export default AddMovie;