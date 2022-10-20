import { useNavigate } from 'react-router-dom'
import httpService from '../httpService'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import NavBar from './NavBar';
import { useEffect } from 'react';



function AddMember() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const auth = async () => {
            const resp = await httpService.Auth()
            if (!resp) {
                navigate('/')
            }
        }
        auth()
    }, [])



    async function onSubmit(memberData) {
        try {

            const data = await httpService.addData("http://localhost:3000/api/members", memberData);
            const obj = {
                _id: data,
                Name: memberData.Name,
                Email: memberData.Email,
                City: memberData.City,
                Movies: []
            };
            dispatch({ type: "addMember", payload: obj });
            navigate('/Members');
        } catch (error) {
            alert("somthing went wrong");
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
                }}>Add Member</h1>
                <label>Name</label>
                <input type="text" placeholder='full name' {...register("Name", { required: true })} />
                {errors?.Name?.type === "required" && <p className="p">This field is required</p>}
                <label>Email</label>
                <input type="text" placeholder='Email' {...register("Email", { required: true })} />
                {errors?.Email?.type === "required" && <p className="p">This field is required</p>}
                <label>City</label>
                <input type="text" placeholder='City ' {...register("City", { required: true })} />
                {errors?.City?.type === "required" && <p className="p">This field is required</p>}

                <p className='p' >you must check and touch all fields </p>
                <input type="submit" />
                <input type={"button"} value="back" onClick={() => navigate('/Members')} />
            </form>
        </div>
    )

}

export default AddMember