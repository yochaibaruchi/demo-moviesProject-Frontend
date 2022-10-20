import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import httpService from '../httpService'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from 'axios';
import NavBar from './NavBar';
function EditMember() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    const [member, setMember] = useState()
    useEffect(() => {
        const getMember = async () => {
            const data = await httpService.getdataWithAuth("http://localhost:3000/api/members/" + id)
            if (!data.auth) {
                navigate('/')
            } else {
                setMember(data.myData)
            }
        }
        getMember()
    }, [])

    const onSubmit = async (memData) => {
        const obj = {
            _id: id,
            Name: memData.Name,
            Email: memData.Email,
            City: memData.City
        }
        try {
            await httpService.updateData("http://localhost:3000/api/members/" + id, memData)
            dispatch({ type: "updateMember", payload: obj })
            navigate("/Members")
        } catch (error) {
            alert("something went wrong")
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
                }}>Edit Member</h1>
                <label>Name</label>
                <input type="text" defaultValue={member?.Name} {...register("Name", { required: true })} />
                {errors?.Name?.type === "required" && <p className="p">This field is required</p>}
                <label>Email</label>
                <input type="text" defaultValue={member?.Email}{...register("Email", { required: true })} />
                {errors?.Email?.type === "required" && <p className="p">This field is required</p>}
                <label>City</label>
                <input type="text" defaultValue={member?.City}{...register("City", { required: true })} />
                {errors?.City?.type === "required" && <p className="p">This field is required</p>}

                <p className='p' >you must check and touch all fields </p>
                <input type="submit" />
                <input type={"button"} value="back" onClick={() => navigate('/Members')} />
            </form>
        </div>
    )

}

export default EditMember