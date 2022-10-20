import React from "react";
import httpService from '../httpService'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import "./Login.css"

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (userData) => {
        const data = await httpService.addData("http://localhost:3000/api/users/login", userData)
        setFlag(data.enter)
        if (data.enter) {
            sessionStorage["token"] = data.token
            dispatch({ type: "userName", payload: data.userFullName })
            navigate('/Main')
        }
    };

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{
            fontWeight: "100",
            color: "white",
            textAlign: "center",
            paddingBottom: "10px",
            borderBottom: "1px solid rgb(79, 98, 148)"
        }}>movies.com</h1>
        <label>User Name</label>
        <input
            {...register("UserName", {
                required: true
            })}
        />
        {errors?.UserName?.type === "required" && <p className="p">This field is required</p>}
        <label>Password</label>
        <input type={"password"} {...register("Password", { required: true })} />
        {errors?.Password?.type === "required" && (
            <p className="p">This field is required</p>
        )}
        {flag === false && (<p className="p">user name or password are incorrect</p>)}
        <input type="submit" value={"login"} />
    </form>



    )

}

export default Login;